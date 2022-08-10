const express = require("express");
const publicRouter = express.Router();
const pagesController = require("../controllers/pagesController")

// Rutas Públicas:
// ...

publicRouter.get("/login", pagesController.login);
publicRouter.get("/register", pagesController.register);
publicRouter.get("/", pagesController.landing);

module.exports = publicRouter;
