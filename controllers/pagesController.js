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


  //Te traes TODOS los tweets
  const allTweets = await Tweet.find().populate("author");

  //Filtras los tweets para obtener solo los de tus followings o los tuyos
  const filteredTweets = allTweets
    .filter(
      (tweet) =>
        //SI el autor del tweet esta incluido en tu lista de follows
        req.user.followingList.includes(tweet.author._id) ||
        //Si soy yo el autor, tambien quiero verlo
        tweet.author.userName === req.user.userName
    )
    .sort(
      //Los ordena por fecha del mas nuevo al mas viejo
      function (a, b) {
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
