const User = require("../models/User");
const _ = require("lodash");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function landing(req, res) {
  res.render("landing");
}

async function home(req, res) {
  let users = await User.find();
  // const tweets = await Tweet.find({
  //   author: { $in: req.user.followingList },
  // })
  //   .populate({
  //     path: "author",
  //   })
  //   .sort("date");
  const tweets = await Tweet.find({
    $or: [
      {
        author: { $in: req.user.followingList },
      },
      { userName: req.user.userName },
    ],
  })
    .sort([["date", -1]])
    .populate({
      path: "author",
    });
  res.ren;
  res.render("home", { user: req.user, tweets, users });
}

async function register(req, res) {
  res.render("register");
}

async function login(req, res) {
  res.render("login");
}

module.exports = {
  landing,
  home,
  register,
  login,
};
