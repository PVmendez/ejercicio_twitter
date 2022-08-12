const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  description: String,
  profilePhoto: String,
  tweetList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tweet",
    },
  ],
  followerList: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
  followingList: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
