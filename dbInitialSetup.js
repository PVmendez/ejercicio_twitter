const db = require("./models");
const tweetSeeder = require("./seeders/tweetSeeder");
const userSeeder = require("./seeders/userSeeder");

module.exports = async () => {
	db.connection;
	await tweetSeeder();
	await userSeeder();
	console.log('[Database] Se han insertado los datos');
};
