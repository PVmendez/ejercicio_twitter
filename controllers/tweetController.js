const Tweet = require("../models/Tweet");

    async function show(req, res) {
        const tweet = await Tweet.findById(req.params.id).populate("user");
        res.render("tweet", { tweet });
    }

module.exports = {
    show,
}
