
async function login(req, res) {
  res.render("home", { articles });
}

// Otros handlers...
// ...

module.exports = {
  login
};
