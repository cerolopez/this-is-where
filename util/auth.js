import pl from "passport-local";
import bcrypt from "bcrypt";

const LocalStrategy = pl.Strategy;
function initialize(passport, getUserByUsername) {
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
