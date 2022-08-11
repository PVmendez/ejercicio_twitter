require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");
const session = require("express-session");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());

passport.use('login',
  new LocalStrategy(async function (username, password, done) {
    const user = await User.findOne({ userName: username});

    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.use('register', new LocalStrategy({
        username : 'username',
        email : 'email',
        passReqToCallback : true 
    },
    function(req, username, email, done) {
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
));

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


routes(app);

dbInitialSetup(); // Crea tablas e inserta datos de prueba.

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
