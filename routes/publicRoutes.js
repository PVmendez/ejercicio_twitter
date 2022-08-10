const express = require("express");
const publicRouter = express.Router();

// Rutas Públicas:
// ...

publicRouter.get("/login");
publicRouter.get("/register");
publicRouter.get("/");

module.exports = publicRouter;
