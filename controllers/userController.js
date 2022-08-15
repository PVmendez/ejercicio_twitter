const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display a listing of the resource.
async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
	  const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

	const user = await User.findOne({ userName: req.params.userName })
    .populate({
      path: "tweetList",
      populate: {
        path: "author",
      },
    })
    .populate("followerList");

	return res.render("profilePage", { suggestedUsers, user, authUser: req.user });
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

async function showFollowers(req, res) {
	// const followerUsers = await User.find({ $in: req.user.id.followerList });
  const user = await User.findOne({ _id: req.params.id }).populate("followerList");
	const followerUsers = await User.find({_id: {$in: user.followerList}})
	const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

	return res.render("showFollowers", { followerUsers, suggestedUsers });
}

async function showFollowing(req, res) {
	// const followingUsers = await User.find({ $in: req.body.id.followingList });
	const user = await User.findOne({ _id: req.params.id }).populate(
    "followingList"
  );
  const followingUsers = await User.find({ _id: { $in: user.followingList } });
	  const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

	return res.render("showFollowing", { followingUsers, suggestedUsers });
}

async function search(req, res) {
	return res.redirect("/user/" + req.query.search);
}

module.exports = {
	index,
	show,
	follow,
	unfollow,
	showFollowers,
	showFollowing,
	index,
	show,
	follow,
	unfollow,
	search,
};
