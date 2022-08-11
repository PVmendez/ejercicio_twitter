const Tweet = require("../models/Tweet");
const User = require("../models/User");
const { faker } = require("@faker-js/faker");

module.exports = async () => {
  Tweet.collection.deleteMany();
  const users = await User.find();
  const tweets = [];

  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * 10);
    tweets.push(
      new Tweet({
        content: faker.lorem.paragraph(),
        date: faker.date.betweens(
          "2011-01-01T00:00:00.000Z",
          "2022-12-12T00:00:00.000Z"
        ),
        author: users[2]._id,
        likes: Math.floor(Math.random() * 10),
      })
    );
  }
  await Tweet.collection.insertMany(tweets);
};
