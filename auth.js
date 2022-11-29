import express from "express";
import passport from "passport";
import pl from "passport-local";
import usersDB from "./db/usersDB.js";
import bcrypt from "bcrypt";

const LocalStrategy = pl.Strategy;
const getUserByUsername = usersDB.getUserByUsername;
const getUserById = usersDB.getUserById;

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const dbResponse = await getUserByUsername(username);
    if (!dbResponse.success) {
      return done(null, false, { message: "Invalid username" });
    }
    const user = dbResponse.user;
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Invalid password" });
      }
    } catch (e) {
      return done(e);
    }
  };
  const strategy = new LocalStrategy(
    { usernameField: "username" },
    authenticateUser
  );
  passport.use(strategy);

  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, { id: user._id.toString(), username: user.username });
    });
  });

  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
}

export default initialize;
