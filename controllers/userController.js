const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display the specified resource.
async function show(req, res) {
	const users = await User.find().limit(3);
	const user = await User.findOne({ userName: req.params.userName }).populate({
		path: "tweetList",
		populate: {
			path: "author",
		},
	});
  const suggestedUsers = await User.find({
		_id: { $in: req.user.followingList },
	});

	return res.render("profilePage", {  suggestedUsers, users, user, authUser: req.user });
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
	const suggestedUsers = await User.find({
		_id: { $in: req.user.followingList },
	});

	return res.render("profilePage", { suggestedUsers, user, authUser: req.user });
}

async function follow(req, res) {
  //Vas a la base de datos y te traes el usuario que queres seguir
	const user = await User.findOne({ _id: req.params.id });
  //Te agregas a vos a su lista de seguidores
	user.followerList.push(req.user);
	user.save();

  //Te buscas a vos en la base de datos
	await User.findOneAndUpdate(
		{ _id: req.user._id },
		{
      //Lo agregas a el a tu lista de followings
			$push: { followingList: user },
		}
	);
	res.redirect("back");
}

async function unfollow(req, res) {
  //Vas a la base de datos y te traes el usuario que queres dejar de seguir
  await User.findOneAndUpdate(
    { _id: req.params.id },
    {
      //Te sacas a vos (req.user) de su lista de followers
      $pull: { followerList: req.user._id },
    }
  );

  //Vas a la base de datos y te traes el usuario que matchea con tu usuario (req.user)
  const user = await User.findOne({ _id: req.params.id });
  await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      //Lo sacas a el de tu following list
      $pull: { followingList: user._id },
    }
  );

  res.redirect("back");
}

async function showFollowers(req, res) {

  const user = await User.findOne({ _id: req.params.id }).populate("followerList");
	const followerUsers = await User.find({_id: {$in: user.followerList}})

	const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

	return res.render("showFollowers", { followerUsers, suggestedUsers, user });
}

async function showFollowing(req, res) {
	const user = await User.findOne({ _id: req.params.id }).populate(
    "followingList"
  );
  const followingUsers = await User.find({ _id: { $in: user.followingList } });
	  const suggestedUsers = await User.find({
      _id: { $nin: req.user.followingList },
    });

	return res.render("showFollowing", { followingUsers, suggestedUsers, user });
}

async function search(req, res) {
	return res.redirect("/user/" + req.query.search);
}

module.exports = {
	show,
	follow,
	unfollow,
	showFollowers,
	showFollowing,
	search,
};
