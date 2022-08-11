const { User, Tweet} = require("../models");

const tweetController = {
		show: async (req, res) => {
			const users = await User.find().limit(3);
			const tweet = await Tweet.findById(req.params.tweetId).populate("user");
			res.render("tweet", { tweet, users });
		},
};

module.exports = tweetController;