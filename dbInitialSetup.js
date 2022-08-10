const db = require("./models");
const tweetSeeder = require("./seeders/tweetSeeder");
const userSeeder = require("./seeders/userSeeder");

module.exports = async () => {
	db.connection;
	tweetSeeder();
	userSeeder();
};
