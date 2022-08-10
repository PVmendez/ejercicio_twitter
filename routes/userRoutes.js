const express = require("express");
const userRouter = express.Router();

// Rutas del user:
// ...

userRouter.get("/:user/:id");
userRouter.get("/:user/tweet/:id");

module.exports = userRouter;
