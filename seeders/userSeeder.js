const User = require("../models/User");

const { faker } = require("@faker-js/faker");

User.collection.deleteMany({});

module.exports = async () => {
	const users = [];

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
	User.collection.insertMany(users);
};
