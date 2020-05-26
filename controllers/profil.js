const Membership = require("../models/Membership");
const bcrypt = require("bcrypt");

const profil = {
  insertSingleProfil: (req, res, next) => {
    const membershipHashPassword = req.body.membershipHashPassword;
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    const requestDate = new Date();
    let charterSigning = req.body.charterSigning;
    if (charterSigning) {
      charterSigning = "oui";
    }
    let RGPDSigning = req.body.RGPDSigning;
    if (RGPDSigning) {
      RGPDSigning = "oui";
    }

    const newMembership = new Membership({
      membershipEmail: req.body.membershipEmail,
      membershipHashPassword: hash,
      memberActive: "non",
      requestDate: requestDate,
      validationDate: " ",
      compagnyRepresentFirstname: req.body.compagnyRepresentFirstname,
      compagnyRepresentLastname: req.body.compagnyRepresentLastname,
      compagnyRepresentFunction: req.body.compagnyRepresentFunction,
      compagnyRepresentQuote: req.body.compagnyRepresentQuote,
      compagnyName: req.body.compagnyName,
      compagnyAdress: req.body.compagnyAdress,
      compagnyAdditionalAdress: req.body.compagnyAdditionalAdress,
      compagnyPostalCode: req.body.compagnyPostalCode,
      compagnyCity: req.body.compagnyCity,
      compagnyTelephone: req.body.compagnyTelephone,
      compagnyEmail: req.body.compagnyEmail,
      compagnyWebside: req.body.compagnyWebside,
      compagnyFacebook: req.body.compagnyFacebook,
      compagnyInstagram: req.body.compagnyInstagram,
      compagnyLinkedin: req.body.compagnyLinkedin,
      compagnyTwitter: req.body.compagnyTwitter,
      compagnyActivityArea: req.body.compagnyActivityArea,
      compagnyActivityDescription: req.body.compagnyActivityDescription,
      charterSigning: charterSigning,
      RGPDSigning: RGPDSigning,
      paymentMode: req.body.paymentMode,
      compagnyLogo: `${req.protocol}://${req.get("host")}/images/${
        req.files.compagnyLogo[0].filename
      }`,
      compagnyCoverPhoto: `${req.protocol}://${req.get("host")}/images/${
        req.files.compagnyCoverPhoto[0].filename
      }`,
      compagnyRepresentPhoto: `${req.protocol}://${req.get("host")}/images/${
        req.files.compagnyRepresentPhoto[0].filename
      }`,
      compagnyPresentationFile: `${req.protocol}://${req.get("host")}/images/${
        req.files.compagnyPresentationFile[0].filename
      }`,
    });

    Membership.insertMany(newMembership, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json({ message: "Enregistrement effectué" });
  },
  findSingleProfilQuery: (req, res) => {
    const userId = req.query.id;
    Membership.find({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  findSingleProfilBody: (req, res) => {
    const userId = req.body._id;
    Membership.find({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  findAllProfil: (req, res) => {
    Membership.find({}, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  findAllActiveProfil: (req, res) => {
    Membership.find({ memberActive: "oui" }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  updateActivateProfil: (req, res) => {
    let userId = req.body._id;
    delete req.body._id;
    let list = req.body;

    Membership.updateOne({ _id: userId }, { $set: list }, (err) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json({ message: "Enregistrement effectué" });
    });
  },
  deleteProfil: (req, res) => {
    const userId = req.body._id;
    Membership.deleteOne({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json({ message: "Suppression du profil " + userId });
    });
  },
  updateMdp: (req, res) => {
    const [userMail, membershipHashPassword] = [
      req.body.membershipEmail,
      req.body.membershipHashPassword,
    ];
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    Membership.updateOne(
      { membershipEmail: userMail },
      { membershipHashPassword: hash },
      (err, data) => {
        if (err) {
          res.status(500).json({});
          return;
        }
        res.json({ message: "mot de passe modifié" });
      }
    );
  },
};
module.exports = profil;
