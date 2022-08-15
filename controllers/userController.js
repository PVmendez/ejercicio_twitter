const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const users = await User.find();
  const authUser = req.user;
  const user = await User.findOne({ userName: req.params.userName }).populate({
    path: "tweetList",
    populate: {
      path: "author",
    },
  });

  return res.render("profilePage", { users, user, authUser });
}

async function follow(req, res) {
  await User.findOneAndUpdate(
    { id: req.params.id },
    {
      $push: { followerList: req.user },
    }
  );

  const user = await User.findOne({ id: req.params.id });
  await User.findOneAndUpdate(
    { id: req.user.id },
    {
      $push: { followingList: user },
    }
  );
  res.redirect("back");
}

async function unfollow(req, res) {
  await User.findOneAndUpdate(
    { id: req.params.id },
    {
      $pull: { followerList: req.user._id },
    }
  );

  const user = await User.findOne({ userName: req.params.userName });
  await User.findOneAndUpdate(
    { id: req.user.id },
    {
      $pull: { followingList: user._id },
    }
  );

  res.redirect("back");
}

async function search(req, res) {
  return res.redirect("/user/" + req.query.search);
}

module.exports = {
  index,
  show,
  follow,
  unfollow,
  search,
};
