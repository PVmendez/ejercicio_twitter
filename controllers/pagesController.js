const User = require("../models/User")
const _ = require("lodash");
const Tweet = require("../models/Tweet")

// Display a listing of the resource.
async function landing(req, res) {
    res.render("landing")
}

async function home(req, res) {
  const user = req.user;
  let users = await User.find();
  const tweets = await Tweet.find({ author: { $in: req.user.followingList } })
    .sort("-createdAt")
    .populate({
      path: "author",
    });
  res.render("home", { user, tweets, users });
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
	login
};
