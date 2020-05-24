const mongoose = require("mongoose");

const testMulter = new mongoose.Schema({
  superAdminEmail: String,
  superAdminHashPassword: String,
  image: String,
});
module.exports = mongoose.model("TestMulter", testMulter);
