const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
    const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });
    
  const authUser = req.user;
  const user = await User.findOne({ userName: req.params.userName }).populate({
    path: "tweetList",
    populate: {
      path: "author",
    },
  });

  return res.render("profilePage", { suggestedUsers, user, authUser });
}

async function follow(req, res) {
  const user = await User.findOne({ _id: req.params.id });
  user.followerList.push(req.user);
  user.save();

  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: { followingList: user },
    }
  );
  res.redirect("back");
}

async function unfollow(req, res) {
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      $pull: { followerList: req.user._id },
    }
  );

  const user = await User.findOne({ _id: req.params.id });
  await User.findOneAndUpdate(
    { _id: req.user._id },
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
