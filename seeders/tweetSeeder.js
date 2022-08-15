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
        likes: [],
      })
    );
  }

  for (const tweet of tweets) {
    tweet.likes.push(_.sample(users));
  }

  await Tweet.collection.insertMany(tweets);

  // for (const user of users) {
  //   for (const tweet of tweets) {
  //     const userTweets = tweets.filter(
  //       (t) => tweet._id.toString() != t._id.toString()
  //     );
  //     user.tweetList = userTweets;
  //     await user.save();
  //   }
  // }

  for (let i = 0; i < users.length; i++) {
    users[i].tweetList.push(tweets[i]);
    await Tweet.findOneAndUpdate({ _id: tweets[i]._id }, { author: users[i] });
    await users[i].save();
  }


  console.log("[Database] Se corrió el seeder de Tweet.");
};
