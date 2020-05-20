const SuperAdmin = require("../models/SuperAdmin");
const MemberShip = require("../models/Membership");
const bcrypt = require("bcrypt");

const signUp = {
  signUpMembership: (req, res, next) => {
    const membershipHashPassword = req.body.membershipHashPassword;
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    const newMember = new MemberShip({
      membershipEmail: req.body.membershipEmail,
      membershipHashPassword: hash,
      requestDate: req.body.requestDate,
      validationDate: req.body.validationDate,
      compagnyRepresentName: req.body.compagnyRepresentName,
      compagnyRepresentLastname: req.body.compagnyRepresentLastname,
      compagnyRepresentFunction: req.body.compagnyRepresentFunction,
      compagnyRepresentQuote: req.body.compagnyRepresentQuote,
      compagnyRepresentPhoto: req.body.compagnyRepresentPhoto,
      compagnyName: req.body.compagnyName,
      compagnyAdress: req.body.compagnyAdress,
      compagnyAdditionalAdress: req.body.compagnyAdditionalAdress,
      compagnyPostalCode: req.body.compagnyPostalCode,
      compagnyCity: req.body.compagnyCity,
      compagnyTelephon: req.body.compagnyTelephon,
      compagnyEmail: req.body.membershipEmail,
      compagnyWebside: req.body.compagnyWebside,
      compagnyFacebook: req.body.compagnyFacebook,
      compagnyInstagram: req.body.compagnyInstagram,
      compagnyLinkedin: req.body.compagnyLinkedin,
      compagnyTwitter: req.body.compagnyTwitter,
      compagnyActivityArea: req.body.compagnyActivityArea,
      compagnyActivityDescription: req.body.compagnyActivityDescription,
      compagnyLogo: req.body.compagnyLogo,
      compagnyCoverPhoto: req.body.compagnyCoverPhoto,
      compagnyPresentationFile: req.body.compagnyPresentationFile,
      charterSigning: req.body.charterSigning,
    });

    MemberShip.insertMany(newMember, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json({ message: "Enregistrement effectué" });
  },
  signUpSuperAdmin: (req, res, next) => {
    const superAdminHashPassword = req.body.superAdminHashPassword;
    const hash = bcrypt.hashSync(superAdminHashPassword, 10);
    const newSuperAdmin = new SuperAdmin({
      superAdminEmail: req.body.superAdminEmail,
      superAdminHashPassword: hash,
    });
    SuperAdmin.insertMany(newSuperAdmin, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json("Enregistrement effectué");
  },
};
module.exports = signUp;
