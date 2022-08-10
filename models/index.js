const mongoose = require("mongoose");
const User = require("./User");
const Tweet = require("./Tweet");

// Luego de definir los modelos, se pueden establecer relaciones
// entre los mismos...

mongoose.connect("mongodb://localhost/ejercicio_twitter");
const connection = mongoose.connection
	.once("open", () =>
		console.log("¡Conexión con la base de datos establecida!")
	)
	.on("error", (error) => console.log(error));

module.exports = {
	User,
	Tweet,
	connection,
};
