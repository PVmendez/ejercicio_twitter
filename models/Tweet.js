const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	content: String,
	author: [
		{
			id: {
				type: mongoose.Schema.ObjectId,
				ref: "User",
			},
		},
	],
	date: Date,
	likes: Number,
});

module.exports = mongoose.model("Tweet", tweetSchema);
