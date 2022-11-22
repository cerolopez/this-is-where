import pl from "passport-local";
import bcrypt from "bcrypt";
// import usersDB from "./db/usersDB";
const LocalStrategy = pl.Strategy;


function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const dbResponse = await getUserByUsername(username);
    const failureMsg = "Invalid login credentials";
    if (!dbResponse.success) {
      return done(null, false, { message: failureMsg});
    }
    try {
      if (await bcrypt.compare(password, res.user.password)) {
        return done(null, user)

      } else {
        return done(null, false, { message: failureMsg });

      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "username" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user._id.toString()));
  passport.deserializeUser((user_id, done) => {
  return done(null, getUserById(id)) });

}

export default initialize;