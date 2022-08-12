const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/userController');
const tweetController = require('../controllers/tweetController');

// Rutas del user:
// ...

userRouter.get("/:userName", userController.show);
userRouter.get("/:userName/:tweetId", tweetController.show)

module.exports = userRouter;
