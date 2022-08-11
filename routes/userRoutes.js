const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/userController');
const tweetController = require('../controllers/tweetController');

// Rutas del user:
// ...

userRouter.get("/:username", userController.show);
userRouter.get("/:username/:tweetId", tweetController.show);

module.exports = userRouter;
