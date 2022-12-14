const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
const checkAuthentication = require("../middlewares/checkAuthentication");

// Rutas del user:

userRouter.post("/createTweet", tweetController.store);
userRouter.get("/tweet/:tweetId/like", tweetController.like);
userRouter.get("/tweet/:tweetId/dislike", tweetController.dislike);

userRouter.get("/user/:userName", userController.show);
userRouter.get("/user", userController.search);

userRouter.post("/:id/follow/", userController.follow);
userRouter.post("/:id/unfollow/", userController.unfollow);

userRouter.get("/user/:id/followers", userController.showFollowers);
userRouter.get("/user/:id/following", userController.showFollowing);

userRouter.get("/:userName/:tweetId", tweetController.show);
userRouter.post("/:userName/:tweetId/delete", tweetController.destroy);

module.exports = userRouter;
