const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstName: String,
	lastName: String,
	userName: String,
	email: String,
	description: String,
	profilePhoto: String,
	tweetList: [String],
	followerList: [String],
	followingList: [String],
});

module.exports = mongoose.model("User", userSchema);
