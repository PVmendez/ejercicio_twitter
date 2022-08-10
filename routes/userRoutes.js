const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/userController');

// Rutas del user:
// ...

userRouter.get("/:username", userController.show);
userRouter.get("/:user/tweet/:id");

module.exports = userRouter;
