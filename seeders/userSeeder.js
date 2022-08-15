const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const _ = require("lodash");

module.exports = async () => {
  await User.collection.deleteMany({});
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      password: "password",
      email: faker.internet.email(),
      description: faker.lorem.sentence(5),
      profilePhoto: faker.internet.avatar(),
    });
  }

  User.collection.insertMany(users);

  const usersFollows = await User.find();
  const usersFollowers = await User.find().limit(5);

  for (const user of usersFollows) {
    const followList = usersFollowers.filter(
      (u) => user._id.toString() != u._id.toString()
    );
    user.followingList = followList;
    user.followerList = followList;
    await user.save();
  }

  console.log("[Database] Se corrió el seeder de User.");
};
