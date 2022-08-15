const Tweet = require("../models/Tweet");
const User = require("../models/User");

async function show(req, res) {
  const tweet = await Tweet.findById(req.params.tweetId)
    .populate("author")
    .populate("likes");

    const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

  res.render("showTweet", { tweet, suggestedUsers, user: req.user });
}

async function store(req, res) {
  const tweet = new Tweet({
    content: req.body.tweetContent,
    date: new Date(),
    author: req.user,
    likes: [],
  });

  await User.findByIdAndUpdate(req.user._id, {
    $push: { tweetList: tweet },
  });

  await tweet.save();
  res.redirect("/home");
}

async function like(req, res) {
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $push: { likes: req.user },
  });
  res.redirect("back");
}

async function dislike(req, res) {
  await Tweet.findByIdAndUpdate(req.params.tweetId, {
    $pull: { likes: req.user._id },
  });
  res.redirect("back");
}

async function destroy(req, res) {
  await Tweet.findByIdAndDelete(req.params.tweetId);
  res.redirect("back");
}

module.exports = {
  show,
  store,
  like,
  dislike,
  destroy,
};
