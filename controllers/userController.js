const { User, Tweet } = require("../models");
const _ = require("lodash");

// Display a listing of the resource.
async function index(req, res) {
  
}

async function showHome(req, res) {
  let users = await User.find().limit(50);
  users = _.sampleSize(users, 3);
  const tweets = await Tweet.find({})
    .sort("-createdAt")
    .limit(20)
    .populate({ path: "author", select: "firstName lastName userName profilePhoto" });
  console.log(tweets);
  res.render("home", { tweets, users });
}

// Display the specified resource.
async function show(req, res) {
    const users = await User.find().limit(3);
    const user = await User.findOne({ username: req.params.username }).populate({
      path: "tweets",
      populate: {
        path: "user",
      },
    });
    if (user) {
      return res.render("profilePage", { thisUser: user, users });
    } 
    return res.redirect("/home");
}
// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  showHome,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
