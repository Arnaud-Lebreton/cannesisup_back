const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  membershipEmail: String,
  membershipHashPassword: String,
  requestDate: String,
  validationDate: String,
  compagnyRepresentName: String,
  compagnyRepresentLastname: String,
  compagnyRepresentFunction: String,
  compagnyRepresentQuote: String,
  compagnyRepresentPhoto: String,
  compagnyName: String,
  compagnyAdress: String,
  compagnyAdditionalAdress: String,
  compagnyPostalCode: String,
  compagnyCity: String,
  compagnyTelephon: String,
  compagnyEmail: String,
  compagnyWebside: String,
  compagnyFacebook: String,
  compagnyInstagram: String,
  compagnyLinkedin: String,
  compagnyTwitter: String,
  compagnyActivityArea: String,
  compagnyActivityDescription: String,
  compagnyLogo: String,
  compagnyCoverPhoto: String,
  compagnyPresentationFile: String,
  charterSigning: String,
});

module.exports = mongoose.model("MemberShip", userSchema);
