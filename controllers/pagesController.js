const User = require("../models/User")
const _ = require("lodash");
const Tweet = require("../models/Tweet")

// Display a listing of the resource.
async function landing(req, res) {
    res.render("landing")
}

async function home(req, res) {
 res.locals.user = req.user;
 let users = await User.find().limit(50);
 users = _.sampleSize(users, 3);
 const tweets = await Tweet.find({})
   .sort("-createdAt")
   .limit(20)
   .populate({
     path: "author",
     select: "firstName lastName userName profilePhoto",
   });
 res.render("home", { tweets, users, user: res.locals.user });
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
