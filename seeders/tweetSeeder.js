const Tweet = require("../models/Tweet");

const { faker } = require("@faker-js/faker");

Tweet.collection.deleteMany({});

module.exports = async () => {
	const tweets = [];

	for (let i = 0; i < 10; i++) {
		const random = Math.floor(Math.random() * 10);
		tweet.push(
			new Tweet({
				content: faker.datatype.string(100),
				date: faker.date.betweens(
					"2011-01-01T00:00:00.000Z",
					"2022-12-12T00:00:00.000Z"
				),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName(),
				userName: "firstName" + "lastName",
				email: faker.internet.email,
				description: faker.datatype.string(30),
				profilePhoto: faker.internet.avatar,
			})
		);
	}

	User.collection.insertMany(users);
};
