const User = require("../models/User");

async function register(req, res) {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    description: req.body.description
  })
  await user.save(user);
  res.redirect("home")
}


// Otros handlers...
// ...


module.exports = {
  register
};
