const mongoose = require("mongoose");

const superAdminSchema = new mongoose.Schema({
  superAdminEmail: String,
  superAdminHashPassword: String,
});
module.exports = mongoose.model("SuperAdmin", superAdminSchema);
