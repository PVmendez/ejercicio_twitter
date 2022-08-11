const User = require("../models/User");

const { faker } = require("@faker-js/faker");


module.exports = async () => {
  await User.collection.deleteMany({});

	for (let i = 0; i < 10; i++) {
		const random = Math.floor(Math.random() * 10);
		users.push(
			new User({
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				userName: faker.internet.userName(),
				email: faker.internet.email(),
				description: faker.lorem.paragraph(),
				profilePhoto: faker.internet.avatar(),
			})
		);
	}
	await User.collection.insertMany(users);
  const users = [];

  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random() * 10);
    users.push(
      new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        userName: faker.internet.userName(),
        password: "password",
        email: faker.internet.email(),
        description: faker.lorem.paragraph(),
        profilePhoto: faker.internet.avatar(),
      })
    );
  }
  await User.collection.insertMany(users);
};
