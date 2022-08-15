const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        const car = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return car.test(email);
      },
      min: [2, "Username must have at least 2 characters"],
      max: [20, "Username must have at least 20 characters"],
    },
  },
  password: String,
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
  coverPhoto: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.validatePassword = async function (password) {
 return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
