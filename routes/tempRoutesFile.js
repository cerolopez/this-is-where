// import express from 'express';
// import passport from "passport";
// import usersDB from "../db/usersDB.js";
// import { createUser, usernameIsAvailable, emailCanBeUsed } from "../create_user.js";
// let router = express.Router();

// // const dbError = new Error("No response from database.");


// // router.get("/changeProfilePrivacy", async (req, res) => {
// //   const userId = req.session.passport.user.id;
// //   if (!userId) {
// //     return res.json({
// //       success: false,
// //       msg: "Cannot update user without userId",
// //       err: new Error("Must have user ID")
// //     });
// //   }
// //   let dbResponse = await usersDB.changeProfileVisibility(userId);
// //   if (!dbResponse) {
// //     return res.json({
// //       success: false,
// //       msg: "No response from database.",
// //       err: dbError
// //     });
// //   }
// //   return res.json({
// //     success: dbResponse.success,
// //     msg: dbResponse.msg,
// //     err: dbResponse.err
// //   });

// // });

// // router.post("/updateUserBio", async (req, res) => {
// //   const bio = req.body.bio;
// //   const userId = req.session.passport.user.id;
// //   let dbResponse = await usersDB.updateUserBio(userId, bio);
// //   if (!dbResponse) {
// //     return res.json({
// //       success: false,
// //       msg: "No response from database.",
// //       err: dbError
// //     });
// //   }
// //   return res.json({
// //     success: dbResponse.success,
// //     msg: dbResponse.msg,
// //     err: dbResponse.err
// //   });

// // });

// // router.post("/updateUserEmail", async (req, res) => {
// //   const newEmail = req.body.email;
// //   const userId = req.session.passport.user.id;
// //   const dbResponse = await usersDB.updateEmail(userId, newEmail);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   if (!dbResponse.success) {
// //     res.json({success: false, msg: dbResponse.msg});
// //   } else {
// //     res.json({success: true, msg: dbResponse.msg});
// //   }
// // });

// // router.post("/updateUsername", async (req, res) => {
// //   const newUsername = req.body.username;
// //   const userId = req.session.passport.user.id;
// //   const dbResponse = await usersDB.updateUsername(userId, newUsername);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   if (!dbResponse.success) {
// //     res.json({success: false, msg: dbResponse.msg});
// //   } else {
// //     res.json({success: true, msg: dbResponse.msg});
// //   }
// // });






// // router.post("/userLogin", passport.authenticate("local", {
// //   successRedirect: "/dashboard",
// //   failureRedirect: "/login"
// // }));

// // router.post('/userLogout', (req, res) => {
// //   req.logout(function(err) {
// //     if (err) {return res.json({err: err, msg: "Error logging out."})};
// //   });
// //   res.redirect("/");
// // });

// // router.post("/deleteAccount", async (req, res) => {
// //   const dbResponse = await usersDB.deleteUserFromDb(req.session.passport.user.id);
// //   req.logout(function(err) {
// //     if (err) {return res.json({err: err, msg: "Error logging out."})};
// //   });
// //   res.redirect("/");
// // });

// // router.post("/register", async (req, res) => {
// //   const usernameAvailable = await usernameIsAvailable(req.body.username);
// //   const emailAvailable = await emailCanBeUsed(req.body.email);
// //   if (!usernameAvailable) {
// //     res.json({success: false, msg: "That username is unavailable. Try another one."});
// //   } else if (!emailAvailable){
// //     res.json({success: false, msg: "An account with that email already exists. Please enter a different email."});
// //   }
// //   else {
// //     const user = await createUser(
// //       req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email);
// //     await usersDB.addUserToDb(user);
// //     res.json({success: true, msg: "Successfully created a new account! Redirecting to login..."});
// //   }

// // });


// // router.get("/getUserId", (req, res) => {
// //   const id = req.session.passport.user.id;
// //   if (!id) {
// //     res.json({success: false, msg: "Could not retrieve user id", user_id: null});
// //   } else {
// //     res.json({success: true, msg: "Successfully retrieved user id", user_id: id});
// //   }
// // });

// // router.get("/getUsername", (req, res) => {
// //   const username = req.session.passport.user.username;
// //   if (!username) {
// //     res.json({success: false, msg: "Could not retrieve username", username: null});
// //   } else {
// //     res.json({success: true, msg: "Successfully retrieved username", username: username});
// //   }
// // });

// // router.get("/getEmail", async (req, res) => {
// //   const dbResponse = await usersDB.getUserByUsername(req.session.passport.user.username);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   if (!dbResponse.success) {
// //     res.json({success: false, msg: "Could not retrieve user's email", email: null});
// //   } else {
// //     const email = dbResponse.user.email;
// //     res.json({success: true, msg: "Successfully retrieved email", email: email});
// //   }

// // });

// // router.get("/getAuthentication", (req, res) => {
// //   res.json({authenticated: req.isAuthenticated()});
// // });

// // router.post("/favoritePost", async (req, res) => {
// //   const postId = req.query.id;
// //   const userId = req.session.passport.user.id;
// //   const dbResponse = await usersDB.addPostToFavorites(userId, postId);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   res.json(dbResponse); //sends back the dbResponse object with success boolean and msg
// // });

// // router.post("/unfavoritePost", async (req, res) => {
// //   const postId = req.query.id;
// //   const userId = req.session.passport.user.id;
// //   const dbResponse = await usersDB.removePostFromFavorites(userId, postId);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   res.json(dbResponse); //sends back the dbResponse object with success boolean and msg

// // });

// // router.post("/flagPost", async (req, res) => {
// //   const postId = req.query.id;
// //   const userId = req.session.passport.user.id;
// //   //TODO - change to postsDB.flagPost
// //   const dbResponse = await usersDB.flagPost(postId, userId);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   res.json(dbResponse);
// // });

// // router.post("/unflagPost", async (req, res) => {
// //   const postId = req.query.id;
// //   const userId = req.session.passport.user.id;
// //   //TODO - change to postsDB.unflagPost
// //   const dbResponse = await usersDB.unflagPost(postId, userId);
// //   if (dbResponse.err) {
// //     return res.json({success: false, msg: dbResponse.msg, err: dbResponse.err});
// //   }
// //   res.json(dbResponse);
// // });

// // router.post("/likePost", async (req, res) => {
// //   const postId = req.query.id;
// //   const userId = req.session.passport.user.id;
// //   const usersDbResponse = await usersDB.likePost(postId, userId);
// //   const postsDbResponse = await postsDB.likePost(postId);
// //   if (usersDbResponse.err) {
// //     return res.json({success: false, msg: usersDbResponse.msg, err: usersDbResponse.err});
// //   }
// //   if (postsDbResponse.err) {
// //     return res.json({success: false, msg: usersDbResponse.msg, err: postsDbResponse.err});
// //   }
// //   if (usersDbResponse.success && postsDbResponse.success) {
// //     res.json({success: true, msg: "Successfully liked post and incremented post's like count."});
// //   } else {
// //     res.json({success: false, msg: "Could not like post or increment its like count."});
// //   }

// //   //TODO [CL] - create postsDB.incrementLikes()

// // });



// export default router;