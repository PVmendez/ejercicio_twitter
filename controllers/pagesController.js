// Display a listing of the resource.
async function landing(req, res) {
    res.render("landing")
}

async function register(req, res) {
  res.render("register");
}

async function login(req, res) {
  res.render("login");
}

module.exports = {
	landing,
	register,
	login
};
