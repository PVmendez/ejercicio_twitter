const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  description: String,
  profilePhoto: {
    type: String,
    default: "/img/defaultPhoto.png",
  },
  tweetList: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Tweet",
    },
  ],
  followerList: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followingList: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
