const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const users = await User.find().limit(3);
  const user = await User.findOne({ userName: req.params.userName });
  // .populate({
  //   path: "tweetList",
  //   populate: {
  //     path: "user",
  //   },
  // });
  return res.render("profilePage", { users, user });
}

async function follow(req, res) {
 await User.findOneAndUpdate(
   { userName: req.params.userName },
   {
     $push: { followerList: req.user },
   }
 );

 const user = await User.findOne({ userName: req.params.userName });
  await User.findOneAndUpdate(
    { userName: req.user.userName },
    {
      $push: { followingList: user },
    }
  );
  res.redirect("back");
}

async function unfollow(req, res) {
 await User.findOneAndUpdate(
   { userName: req.params.userName },
   {
     $pull: { followerList: req.user._id },
   }
 );
 
const user = await User.findOne({ userName: req.params.userName });
await User.findOneAndUpdate(
  { userName: req.user.userName },
  {
    $pull: { followingList: user._id },
  }
);

  res.redirect("back");
}

module.exports = {
  index,
  show,
  follow,
  unfollow,
};
