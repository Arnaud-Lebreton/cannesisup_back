const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  text: String,
});

module.exports = mongoose.model("MemberShip", userSchema);
