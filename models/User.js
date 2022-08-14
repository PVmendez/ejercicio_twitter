const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: String,
  password: String,
  description: String,
  profilePhoto: {
    type: String,
    default: "/img/defaultPhoto.png",
  },
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

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
