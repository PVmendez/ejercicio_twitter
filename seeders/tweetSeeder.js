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
        date: faker.date.betweens(
          "2011-01-01T00:00:00.000Z",
          "2022-12-12T00:00:00.000Z"
        ),
        author: _.sample(users),
        likes: Math.floor(Math.random() * 10),
      })
    );
  }
  await Tweet.collection.insertMany(tweets);

  for (const user of users) {
    const tweets = await Tweet.find({ user });
    user.tweets = tweets;
    await user.save();
  }
};