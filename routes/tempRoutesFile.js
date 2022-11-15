import express from 'express';
import passport from "passport";
import usersDB from "../db/usersDB.js";
let router = express.Router();

const dbError = new Error("No response from database.");


router.get("/change-profile-privacy", async (req, res) => {
  const userId = req.session.passport.user; //TODO - add userID to session
  if (!userId) {
    return res.json({
      success: false,
      msg: "Cannot update user without userId"
      err: new Error("Must have user ID")
    });
  }
  let dbResponse = await usersDB.changeProfileVisibility(userId);
  if (!dbResponse) {
    return res.json({
      success: false,
      msg: "No response from database.",
      err: dbError;
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
      err: dbError;
    });
  }
  return res.json({
    success: dbResponse.success,
    msg: dbResponse.msg,
    err: dbResponse.err
  });

});








export default router;