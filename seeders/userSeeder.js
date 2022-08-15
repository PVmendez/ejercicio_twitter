const User = require("../models/User");
const { faker } = require("@faker-js/faker");
const _ = require("lodash");

module.exports = async () => {
  await User.collection.deleteMany({});
  const users = [];

  for (let i = 0; i < 10; i++) {
    users.push(new User ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      userName: faker.internet.userName(),
      password: "password",
      email: faker.internet.email(),
      description: faker.lorem.sentence(5),
      profilePhoto: faker.internet.avatar(),
      coverPhoto: faker.image.abstract(),
      followerList: [],
      followingList: []
    }));
  }

  for (const user of users){
    // Te traes todos los usuarios menos en el que estas parado
    const filtrado = users.filter((u) => u != user)
    // Agarras 5 random, que son los que ese usuario va A SEGUIR
    const seguidos = _.sampleSize(filtrado,5)
    // Empieza a seguir a esos 5 random que agarraste arriba
    user.followingList = seguidos;

    //Recorres esos 5 que empezo a seguir
    for (let i = 0; i < user.followingList.length; i++){
      //Te paras en el que estas siguiendo, y te asignas a vos como nuevo follower
      user.followingList[i].followerList.push(user)
    }
  }

  User.collection.insertMany(users);

  console.log("[Database] Se corrió el seeder de User.");
};
