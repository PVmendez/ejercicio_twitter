const Tweet = require("../models/Tweet");
const User = require("../models/User");

    async function show(req, res) {
        const tweet = await Tweet.findById(req.params.tweetId).populate("author");
    const users = await User.find().limit(3);

        res.render("showTweet", { tweet, user: tweet.author, users});
    }

module.exports = {
    show,
}
