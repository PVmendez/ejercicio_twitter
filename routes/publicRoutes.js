const express = require("express");
const publicRouter = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require("../middlewares/isAuthenticated");

// Rutas Públicas:
// ...

publicRouter.get("/login");
publicRouter.get("/register");
publicRouter.get("/", userController.showHome);

module.exports = publicRouter;
