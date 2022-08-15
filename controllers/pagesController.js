const User = require("../models/User");
const _ = require("lodash");
const Tweet = require("../models/Tweet");

// Display a listing of the resource.
async function landing(req, res) {
  res.render("landing");
}

async function home(req, res) {
  const suggestedUsers = await User.find({
    _id: { $nin: req.user.followingList } });

  const allTweets = await Tweet.find().populate("author");
  const filteredTweets = allTweets
    .filter(
      (tweet) =>
        req.user.followingList.includes(tweet.author._id) ||
        tweet.author.userName === req.user.userName
    )
    .sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });

  res.render("home", { user: req.user, tweets:filteredTweets, suggestedUsers});
}

async function register(req, res) {
  res.render("register");
}

async function login(req, res) {
  res.render("login");
}

async function logout(req,res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  landing,
  home,
  register,
  login,
  logout
};
