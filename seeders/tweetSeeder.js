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

  //Recorres todos los usuarios
  for (let i = 0; i < users.length; i++) {
    //A cada usuario, le asignas un tweet
    // users[i].tweetList.push(tweets[i]);
        await User.findOneAndUpdate(
          { _id: users[i]._id },
          { $push: { tweetList: tweets[i] } }
        );
    //A ese tweet que asignas, le asignas el usuario como autor
    await Tweet.findOneAndUpdate({ _id: tweets[i]._id }, { author: users[i] });
  }

  console.log("[Database] Se corrió el seeder de Tweet.");
};
