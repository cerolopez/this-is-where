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
      return done(null, false, { message: "Invalid username"});
    }
    const user = dbResponse.user;
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)

      } else {
        return done(null, false, { message: "Invalid password" });

      }
    } catch (e) {
      return done(e);
    }
  };
const strategy = new LocalStrategy({ usernameField: "username"}, authenticateUser);
passport.use(strategy);

passport.serializeUser(function (user, cb) {
  console.log("serialize", user);
  process.nextTick(function () {
    cb(null, { id: user._id.toString(), username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserialize", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

}

export default initialize;




// const strategy = new LocalStrategy(async function verify(username, password, cb) {
//   const dbResponse = await usersDB.getUserByUsername(username);
//   if (!dbResponse.success) {
//     return cb(null, false, { message: "Invalid Username"});
//     console.log("couldnt log in with this username.");
//   }
//   const user = dbResponse.user;
//   try {
//     if (await bcrypt.compare(password, user.password)) {
//       console.log("Password matched!");
//       return cb(null, user)

//     } else {
//       console.log("Password failed:(");
//       return cb(null, false, { message: "Invalid Password" });

//     }
//   } catch (e) {
//     return cb(e);
//   }

// });