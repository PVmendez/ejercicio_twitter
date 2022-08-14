const { faker } = require("@faker-js/faker");
const { Tweet, User } = require("../models");
const _ = require("lodash");

faker.locale = "en";

module.exports = async () => {
  await Tweet.collection.deleteMany({});
  const users = await User.find();
  const tweets = [];
  const date = new Date;

  for (let i = 0; i < 50; i++) {
    tweets.push({
      content: faker.lorem.sentence().substring(0, 139),
      date: date,
      author: _.sample(users),
      likes: Math.floor(Math.random() * 10),
    });
  }
  await Tweet.insertMany(tweets);

  for (const user of users) {
    const random = Math.floor(Math.random() * 10);
    const tweets = await Tweet.find().limit(2);
    
    for (const tweet of tweets) {
      const userTweets = tweets.filter((t) => tweet._id.toString() != t._id.toString());
      user.tweetsList = userTweets;
      await user.save();
    }
  }

  console.log("[Database] Se corrió el seeder de Tweet.");
};
