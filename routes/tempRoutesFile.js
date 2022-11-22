import express from 'express';
import passport from "passport";
import usersDB from "../db/usersDB.js";
import { createUser, usernameIsAvailable, emailCanBeUsed } from "../create_user.js";
let router = express.Router();

const dbError = new Error("No response from database.");


router.get("/change-profile-privacy", async (req, res) => {
  const userId = req.session.passport.user; //TODO - add userID to session
  if (!userId) {
    return res.json({
      success: false,
      msg: "Cannot update user without userId",
      err: new Error("Must have user ID")
    });
  }
  let dbResponse = await usersDB.changeProfileVisibility(userId);
  if (!dbResponse) {
    return res.json({
      success: false,
      msg: "No response from database.",
      err: dbError
    });
  }
  return res.json({
    success: dbResponse.success,
    msg: dbResponse.msg,
    err: dbResponse.err
  });

});

router.post("/update-user-bio", async (req, res) => {
  const bio = req.body.bio;
  const userId = req.session.passport.user;
  let dbResponse = await usersDB.updateUserBio(userId, bio);
  if (!dbResponse) {
    return res.json({
      success: false,
      msg: "No response from database.",
      err: dbError
    });
  }
  return res.json({
    success: dbResponse.success,
    msg: dbResponse.msg,
    err: dbResponse.err
  });

});

//TODO - create successfulLogin and failedLogin routes
router.post("/userLogin", passport.authenticate("local", {
  successRedirect: "/successfulLogin",
  failureRedirect: "/failedLogin"
}));

//temporary, just a test
router.post("/loginTest", (req, res) => {
  console.log("loginTest", req.body);

});

router.get("/successfulLogin", async (req, res) => {
  req.session.storedData = {username: ""};
  const dbResponse = await getUserById(req.session.passport.user);
  if (dbResponse.success) {
    req.session.storedData.username = dbResponse.user.username;
  }
  res.json({success: true, msg: "Login successful"});

});

router.get("/failedLogin", (req, res) => {
  req.session.storedData = {username: ""};
  res.json({success: false, msg: "Invalid login credentials"});
});



router.post("/register", async (req, res) => {
  const usernameAvailable = await usernameIsAvailable(req.body.username);
  const emailAvailable = await emailCanBeUsed(req.body.email);
  if (!usernameAvailable) {
    res.json({success: false, msg: "That username is unavailable. Try another one."});
  } else if (!emailAvailable){
    res.json({success: false, msg: "An account with that email already exists. Please enter a different email."});
  }
  else {
    const user = await createUser(
      req.body.firstName, req.body.lastName, req.body.username, req.body.password, req.body.email);
    await usersDB.addUserToDb(user);
    res.json({success: true, msg: "Successfully created a new account! Redirecting to login..."});
  }

});






export default router;