const db = require("./models");
const tweetSeeder = require("./seeders/tweetSeeder");
const userSeeder = require("./seeders/userSeeder");

module.exports = async () => {
  db.connection;

  // await userSeeder();
  await tweetSeeder();
  console.log("[Database] Se han insertado los datos");
};
