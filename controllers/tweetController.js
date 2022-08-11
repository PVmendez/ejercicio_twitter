const Tweet = require("../models/Tweet");

const tweetController = {
    show: async (req, res) => {
        const tweet = await Tweet.findById(req.params.id).populate("user");

        res.render("tweet", { tweet });
    },
};

module.exports = tweetController;