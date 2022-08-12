const Tweet = require("../models/Tweet");
const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const _ = require("lodash");


module.exports = async () => {
  Tweet.collection.deleteMany();
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

  for (xd of tweets) {
    xd.likes.push(_.sample(users));
  }

  await Tweet.collection.insertMany(tweets);


  for (const user of users) {
    const tweets = await Tweet.find({ user });
    user.tweets = tweets;
    await user.save();
  };
}