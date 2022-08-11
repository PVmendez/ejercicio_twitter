const express = require("express");
const publicRouter = express.Router();
const checkAuthentication = require("../middlewares/checkAuthentication");
const pagesController = require("../controllers/pagesController");
const passport = require("passport");


publicRouter.get("/", pagesController.landing);
publicRouter.get("/home", checkAuthentication, pagesController.home);

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


module.exports = publicRouter;
