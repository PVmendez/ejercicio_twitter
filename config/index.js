const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models");

module.exports = (app) => {
  app.use(
    session({
      secret: "AlgúnTextoSuperSecreto",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.session());

  passport.use(
    "login",
    new LocalStrategy(async function (username, password, done) {
      const user = await User.findOne({ userName: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    })
  );

  passport.use(
    "register",
    new LocalStrategy(
      {
        username: "username",
        email: "email",
        passReqToCallback: true,
      },
      function (req, username, email, done) {
        User.findOne(
          { $or: [{ userName: username }, { email: email }] },
          function (err, user) {
            if (err) return done(err);

            if (user) {
              return done(null, false, {
                message: "Username or email is already taken.",
              });
            } else {
              const user = new User({
                userName: req.body.username,
                email: req.body.email,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                description: req.body.description,
              });
              user.save(user);
              return done(null, user);
            }
          }
        );
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id)

      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, user);
      });
  });

};
