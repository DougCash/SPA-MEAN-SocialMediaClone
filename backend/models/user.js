const mongoose = require("mongoose");
//Plugin to handle checking if we're trying to enter a duplicate entry
const uniqueValidator = require("mongoose-unique-validator");

//Note that the unique flag is set true here, same reason as above
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: {type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
