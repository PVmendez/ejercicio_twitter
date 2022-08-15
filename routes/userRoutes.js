const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/userController');
const tweetController = require('../controllers/tweetController');
const checkAuthentication = require("../middlewares/checkAuthentication");

// Rutas del user:
// ...

userRouter.post("/createTweet", tweetController.store);
userRouter.get("/tweet/:tweetId/like", tweetController.like);
userRouter.get("/tweet/:tweetId/dislike", tweetController.dislike);

userRouter.get("/:userName", userController.show);
userRouter.post("/:userName/follow", userController.follow);
userRouter.post("/:userName/unfollow", userController.unfollow);

userRouter.get("/:userName/:tweetId", tweetController.show);
userRouter.post("/:userName/:tweetId/delete", tweetController.destroy);

module.exports = userRouter;
