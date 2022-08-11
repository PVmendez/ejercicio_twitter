const express = require("express");
const publicRouter = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require("../middleware/isAuthenticated");

// Rutas Públicas:
// ...

publicRouter.get("/login");
publicRouter.get("/register");
publicRouter.get("/", userController.showHome);
const pagesController = require("../controllers/pagesController")
const passport = require("passport")

// Rutas Públicas:
// ...

publicRouter.get("/login", pagesController.login);
publicRouter.post("/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/login"
  })
);

publicRouter.get("/register", pagesController.register);
publicRouter.post("/register",
  passport.authenticate("register", {
    successRedirect: "/home",
    failureRedirect: "/register",
  })
);

publicRouter.get("/", pagesController.landing);

module.exports = publicRouter;
