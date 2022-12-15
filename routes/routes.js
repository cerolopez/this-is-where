import express from "express";
import passport from "passport";
import usersDB from "../db/usersDB.js";
import postsDB from "../db/postsDB.js";
import {
  createUser,
  usernameIsAvailable,
  emailCanBeUsed,
} from "../util/create_user.js";
let router = express.Router();

const dbError = new Error("No response from database.");

router.get("/changeProfilePrivacy", async (req, res) => { //async await
  const userId = req.session.passport.user.id;
  if (!userId) {
    return res.json({
      success: false,
      msg: "Cannot update user without userId",
      err: new Error("Must have user ID"),
    });
  }
  let dbResponse = await usersDB.changeProfileVisibility(userId);
  console.log("from changeProfilePrivacy - dbResponse: ", dbResponse);
  if (!dbResponse) {
    return res.json({
      success: false,
      msg: "No response from database.",
      err: dbError,
    });
  }
  return res.json({
    success: dbResponse.success,
    msg: dbResponse.msg,
    err: dbResponse.err,
  });
});
//probably won't be used - potential delete
router.post("/updateUserBio", async (req, res) => {
  const bio = req.body.bio;
  const userId = req.session.passport.user.id;
  let dbResponse = await usersDB.updateUserBio(userId, bio);
  if (!dbResponse) {
    return res.json({
      success: false,
      msg: "No response from database.",
      err: dbError,
    });
  }
  return res.json({
    success: dbResponse.success,
    msg: dbResponse.msg,
    err: dbResponse.err,
  });
});

router.post("/updateUserEmail", async (req, res) => {
  const newEmail = req.body.email;
  const userId = req.session.passport.user.id;
  const dbResponse = await usersDB.updateEmail(userId, newEmail);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  if (!dbResponse.success) {
    res.json({ success: false, msg: dbResponse.msg });
  } else {
    res.json({ success: true, msg: dbResponse.msg });
  }
});

router.post("/updateUsername", async (req, res) => {
  const newUsername = req.body.username;
  const userId = req.session.passport.user.id;
  const dbResponse = await usersDB.updateUsername(userId, newUsername);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  if (!dbResponse.success) {
    res.json({ success: false, msg: dbResponse.msg });
  } else {
    res.json({ success: true, msg: dbResponse.msg });
  }
});

router.post(
  "/userLogin",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

router.post("/userLogout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return res.json({ err: err, msg: "Error logging out." });
    }
  });
  res.redirect("/");
});

router.post("/deleteAccount", async (req, res) => {
  const dbResponse = await usersDB.deleteUserFromDb(
    req.session.passport.user.id
  );
  req.logout(function (err) {
    if (err) {
      return res.json({ err: err, msg: "Error logging out." });
    }
  });
  res.redirect("/");
});

router.post("/register", async (req, res) => {
  const usernameAvailable = await usernameIsAvailable(req.body.username);
  const emailAvailable = await emailCanBeUsed(req.body.email);
  if (!usernameAvailable) {
    res.json({
      success: false,
      msg: "That username is unavailable. Try another one.",
    });
  } else if (!emailAvailable) {
    res.json({
      success: false,
      msg: "An account with that email already exists. Please enter a different email.",
    });
  } else {
    const user = await createUser(
      req.body.firstName,
      req.body.lastName,
      req.body.username,
      req.body.password,
      req.body.email
    );
    await usersDB.addUserToDb(user);
    res.json({
      success: true,
      msg: "Successfully created a new account! Redirecting to login...",
    });
  }
});

router.get("/getUserId", (req, res) => {
  const id = req.session.passport.user.id;
  if (!id) {
    res.json({
      success: false,
      msg: "Could not retrieve user id",
      user_id: null,
    });
  } else {
    res.json({
      success: true,
      msg: "Successfully retrieved user id",
      user_id: id,
    });
  }
});

router.get("/getUsername", (req, res) => {
  const username = req.session.passport.user.username;
  if (!username) {
    res.json({
      success: false,
      msg: "Could not retrieve username",
      username: null,
    });
  } else {
    res.json({
      success: true,
      msg: "Successfully retrieved username",
      username: username,
    });
  }
});
//is this being used?
router.get("/getUserInfo", async (req, res) => {
  const dbResponse = await usersDB.getUserByUsername(
    req.session.passport.user.username
  );
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  if (!dbResponse.success) {
    res.json({
      success: false,
      msg: "Could not retrieve user info",
      email: null,
    });
  } else {
    const userBio = dbResponse.user.bio;
    const dateJoined = dbResponse.user.date_joined;
    const userLocation = dbResponse.user.location;

    res.json({
      success: true,
      msg: "Successfully retrieved user info",
      userBio: userBio,
      dateJoined: dateJoined,
      userLocation: userLocation
    });
  }
});

router.get("/getFavoritePosts", async (req, res) => {
  const userData = await usersDB.getUserByUsername(
    req.session.passport.user.username
  );

  const favoritePostIds = userData.user.favorited_posts;

  const favoritePosts = await postsDB.getFavoritePosts(favoritePostIds);
  res.json(favoritePosts);

});

router.get("/getLikedPosts", async (req, res) => {
  const userData = await usersDB.getUserByUsername(
    req.session.passport.user.username
  );

  const likedPostIds = userData.user.liked_posts;

  const likedPosts = await postsDB.getLikedPosts(likedPostIds);
  res.json(likedPosts);

});

router.get("/getEmail", async (req, res) => {
  const dbResponse = await usersDB.getUserByUsername(
    req.session.passport.user.username
  );
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  if (!dbResponse.success) {
    res.json({
      success: false,
      msg: "Could not retrieve user's email",
      email: null,
    });
  } else {
    const email = dbResponse.user.email;
    res.json({
      success: true,
      msg: "Successfully retrieved email",
      email: email,
    });
  }
});

router.get("/getAuthentication", (req, res) => {
  res.json({ authenticated: req.isAuthenticated() });
});

router.get("/favoritePost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  const dbResponse = await usersDB.addPostToFavorites(userId, postId);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  res.json(dbResponse); //sends back the dbResponse object with success boolean and msg
});

router.get("/unfavoritePost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  const dbResponse = await usersDB.removePostFromFavorites(userId, postId);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  res.json(dbResponse); //sends back the dbResponse object with success boolean and msg
});

router.get("/flagPost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  //TODO - change to postsDB.flagPost
  const dbResponse = await usersDB.flagPost(postId, userId);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  res.json(dbResponse);
});

router.get("/unflagPost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  //TODO - change to postsDB.unflagPost
  const dbResponse = await usersDB.unflagPost(postId, userId);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  res.json(dbResponse);
});

router.get("/likePost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  const usersDbResponse = await usersDB.likePost(postId, userId);
  const postsDbResponse = await postsDB.likePost(postId);
  if (usersDbResponse.err) {
    return res.json({
      success: false,
      msg: usersDbResponse.msg,
      err: usersDbResponse.err,
    });
  }
  if (postsDbResponse.err) {
    return res.json({
      success: false,
      msg: usersDbResponse.msg,
      err: postsDbResponse.err,
    });
  }
  if (usersDbResponse.success) {
    res.json({
      success: true,
      msg: "Successfully liked post and incremented post's like count.",
    });
  } else {
    res.json({
      success: false,
      msg: "Could not like post or increment its like count.",
    });
  }
});

router.get("/unlikePost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  const usersDbResponse = await usersDB.unlikePost(postId, userId);
  const postsDbResponse = await postsDB.unlikePost(postId);
  if (usersDbResponse.err) {
    return res.json({
      success: false,
      msg: usersDbResponse.msg,
      err: usersDbResponse.err,
    });
  }
  if (postsDbResponse.err) {
    return res.json({
      success: false,
      msg: usersDbResponse.msg,
      err: postsDbResponse.err,
    });
  }
  if (usersDbResponse.success) {
    res.json({
      success: true,
      msg: "Successfully unliked post and decremented post's like count.",
    });
  } else {
    res.json({
      success: false,
      msg: "Could not unlike post or decrement its like count.",
    });
  }
});

router.post("/addReport", async (req, res) => {
  const postId = req.body.postId;
  const reportType = req.body.reportType;
  const dbResponse = await postsDB.addReport(postId, reportType);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  res.json(dbResponse);
});

router.get("/getPostsLength", async (req, res) => {
  const postsLength = await postsDB.getPostsLength();
  res.json(postsLength);
});

router.get("/getFilteredPostsLength", async (req, res) => {
  const query = req.query;
  const page = query.page;
  const pageSize = query.pageSize;
  const cityFilter = req.query.selectedCity;
  const typeFilter = req.query.selectedType;

  const filteredLength = await postsDB.getFilteredLength(
    parseInt(page),
    parseInt(pageSize),
    cityFilter,
    typeFilter
  );
  res.json(filteredLength);
});

router.post("/updateProfileInfo", async (req, res) => {
  const userId = req.session.passport.user.id;
  const newFirstName = req.body.first_name;
  const newLastName = req.body.last_name;
  const newUsername = req.body.username;
  const newLocation = req.body.location;
  const newBio = req.body.bio;
  const dbResponse = await usersDB.updateProfileInfo(userId, newFirstName, newLastName, newUsername, newLocation, newBio);
  if (dbResponse.err) {
    return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
  }
  res.json(dbResponse);

});

//Below routes by CL

router.post("/newPost", async (req, res) => {
  const postInfo = req.body;
  const username = req.session.passport.user.username;
  const userId = req.session.passport.user.id;
  //TODO - return Post from postsDB.createPost
  let newPost = await postsDB.createPost(postInfo, username);
  const postId = newPost.insertedId.toString();
  const dbResponse = await usersDB.addPostToUser(userId, postId);
  if (dbResponse.success) {
    res.json({
      success: true,
      msg: "Successfully created new post.",
      postId: postId,
    });
  }
});

router.get("/getPosts", async (req, res) => {
  const query = req.query;
  const page = query.page;
  const pageSize = query.pageSize;
  const cityFilter = req.query.selectedCity;
  const typeFilter = req.query.selectedType;

  const listOfPosts = await postsDB.getPosts(
    parseInt(page),
    parseInt(pageSize),
    cityFilter,
    typeFilter
  );

  res.json(listOfPosts);
});

// URL will have postID in URL as query
router.get("/getPost", async (req, res) => {
  const postID = req.query.id;
  const foundPost = await postsDB.getPost(postID);

  if (foundPost) {
    return res.json(foundPost);
  } else {
    res.json({ postFound: false, err: "post not found" });
  }
});

router.post("/editPost", async (req, res) => {
  const postID = req.body.postId;
  const postLocation = req.body.location;
  const postBody = req.body.body;

  const editedPost = await postsDB.editPost(postID, postLocation, postBody);

  if (editedPost) {
    return res.json({ postEdited: true, err: null });
  } else {
    return res.json({ postEdited: false, err: "error editing post" });
  }
});

router.get("/deletePost", async (req, res) => {
  const postID = req.query.id;
  const isDeleted = await postsDB.deletePost(postID);
  const userId = req.session.passport.user.id;
  const deleteFromUser = await usersDB.removePostFromUser(userId, postID);

  if (isDeleted) {
    return res.json({
      postDeleted: true,
      err: null,
      deleteFromUser: deleteFromUser,
    });
  } else {
    return res.json({ postDeleted: false, err: "error deleting post" });
  }
});

router.get("/flagPost", async (req, res) => {
  const postId = req.query.id;
  const userId = req.session.passport.user.id;
  const isFlagged = await postsDB.flagPost(postId, userId);

  if (isFlagged) {
    return res.json({ success: true, postFlagged: true, err: null });
  } else {
    return res.json({
      success: true,
      postFlagged: false,
      err: "error flagging post",
    });
  }
});


router.get("/getLikes", async (req, res) => {
  const userId = req.session.passport.user.id;
  const likesArray = await usersDB.getLikes(userId);
  res.json(likesArray);
});

router.get("/getFavorites", async (req, res) => {
  const userId = req.session.passport.user.id;
  const favoritesArray = await usersDB.getFavorites(userId);
  res.json(favoritesArray);

});

// this route checks if the current user has liked a post; returns boolean
router.get("/checkIfLiked", async (req, res) => {
  const userId = req.session.passport.user.id;

  const postID = req.query.id;

  const isLiked = await usersDB.isLiked(postID, userId);
  res.json(isLiked);
});

// this route checks if the current user has favorited a post; returns boolean
router.get("/checkIfFavorited", async (req, res) => {
  const userId = req.session.passport.user.id;
  const postID = req.query.id;

  const isFavorited = await usersDB.isFavorited(postID, userId);
  res.json(isFavorited);
});


router.get("/resetLikes", async (req, res) => {
  await postsDB.resetAllPostLikes();
  await usersDB.resetAllUsersLikes();


});

router.get("/getUserPosts", async (req, res) => {
  const username = req.session.passport.user.username;

  const data = await postsDB.getUserPosts(username);
  res.json(data);
});

router.get("/getUserProfileInfo", async (req, res) => {
  const userId = req.session.passport.user;
  const dbResponse = await usersDB.getUserProfileInfo(userId);
  if (dbResponse.err) {
    return res.json({
      success: false,
      msg: dbResponse.msg,
      err: dbResponse.err,
    });
  }
  if (!dbResponse.success) {
    res.json({
      success: false,
      msg: "Could not retrieve user info",
      userInfo: null,
    });
  } else {
    console.log("from route: userInfo: ", dbResponse.userInfo);
    res.json({
      success: true,
      msg: "Successfully retrieved user info",
      userInfo: dbResponse.userInfo
    });
  }

});

export default router;
