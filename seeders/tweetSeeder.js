const { faker } = require("@faker-js/faker");
const { Tweet, User } = require("../models");
const _ = require("lodash");

faker.locale = "en";

module.exports = async () => {
  await Tweet.collection.deleteMany({});
  const users = await User.find();
  const tweets = [];

  for (let i = 0; i < 10; i++) {
    tweets.push(
      new Tweet({
        content: faker.lorem.paragraph(),
        date: new Date(),
        author: _.sample(users),
        likes: [],
      })
    );
  }

  for (const tweet of tweets) {
    tweet.likes.push(_.sample(users));
  }

  await Tweet.collection.insertMany(tweets);

  for (const user of users) {
    const tweets = await Tweet.find().limit(2);
    for (const tweet of tweets) {
      const userTweets = tweets.filter(
        (t) => tweet._id.toString() != t._id.toString()
      );
      user.tweetList = userTweets;
      await user.save();
    }
  }

  console.log("[Database] Se corrió el seeder de Tweet.");
};
