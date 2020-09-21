const mongoose = require("mongoose");   //facilite les interactions avec la base de données MongoDB
const uniqueValidator = require("mongoose-unique-validator");   //assure qu'aucun utilisateurs ne peut partager la même adresse e-mail.

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

