const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  description: String,
  profilePhoto: String,
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
  tweetsList: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Tweet",
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
