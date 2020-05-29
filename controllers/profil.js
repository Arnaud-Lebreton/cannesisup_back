const Membership = require("../models/Membership");
const SuperAdmin = require("../models/SuperAdmin");
const sendMail = require("../middlewares/mail");
const bcrypt = require("bcrypt");
const moment = require("moment");
const fs = require("fs");

const profil = {
  insertSingleProfil: (req, res, next) => {
    const membershipHashPassword = req.body.membershipHashPassword;
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    const requestDate = moment().format("DD/MM/YYYY");

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
    let userId;
    if (req.body._idMembership) {
      userId = req.body._idMembership;
    } else {
      userId = req.body._id;
    }
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
    console.log(list);

    Membership.updateOne({ _id: userId }, { $set: list }, (err) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json({ message: "Enregistrement effectué" });
    });
  },
  updateProfil: (req, res) => {
    const userId = req.body._id;
    //Injecter la nouvelle adresse dans le body
    const compagnyLogoNew = `${req.protocol}://${req.get("host")}/images/${
      req.files.compagnyLogo[0].filename
    }`;
    const compagnyCoverPhotoNew = `${req.protocol}://${req.get(
      "host"
    )}/images/${req.files.compagnyCoverPhoto[0].filename}`;
    req.body.compagnyCoverPhoto = compagnyCoverPhotoNew;
    const compagnyRepresentPhotoNew = `${req.protocol}://${req.get(
      "host"
    )}/images/${req.files.compagnyRepresentPhoto[0].filename}`;
    req.body.compagnyRepresentPhoto = compagnyRepresentPhotoNew;
    const compagnyPresentationFileNew = `${req.protocol}://${req.get(
      "host"
    )}/images/${req.files.compagnyPresentationFile[0].filename}`;
    req.body.compagnyPresentationFile = compagnyPresentationFileNew;
    /*
    //Comparaison avec les fichiers existants
    Membership.findOne({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      //Récupération d'adresse de l'image initiale
      const compagnyLogoInit = data.compagnyLogo.split("/images/")[1];
      //Supression de l'image initiale
      //fs.unlinkSync(`images/${compagnyLogoInit}`);
      //Injecter la nouvelle adresse dans le body

      req.body.compagnyLogo = compagnyLogoNew;

      //Récupération d'adresse de l'image initiale
      const compagnyCoverPhotoInit = data.compagnyCoverPhoto.split(
        "/images/"
      )[1];
      //Supression de l'image initiale
      //fs.unlinkSync(`images/${compagnyCoverPhotoInit}`);
      //Injecter la nouvelle adresse dans le body

      //Récupération d'adresse de l'image initiale
      const compagnyRepresentPhotoInit = data.compagnyRepresentPhoto.split(
        "/images/"
      )[1];
      //Supression de l'image initiale
      //fs.unlinkSync(`images/${compagnyRepresentPhotoInit}`);
      //Injecter la nouvelle adresse dans le body

      //Récupération d'adresse de l'image initiale
      const compagnyPresentationFileInit = data.compagnyPresentationFile.split(
        "/images/"
      )[1];
      //Supression de l'image initiale
      //fs.unlinkSync(`images/${compagnyPresentationFileInit}`);
      //Injecter la nouvelle adresse dans le body*/
    res.json({ message: "Modifications effectuées" });
    /* });*/
  },
  deleteProfil: (req, res) => {
    const userId = req.body._id;
    Membership.findOne({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({ message: "error" });
        return;
      }
      const compagnyLogo = data.compagnyLogo.split("/images/")[1];
      const compagnyCoverPhoto = data.compagnyCoverPhoto.split("/images/")[1];
      const compagnyRepresentPhoto = data.compagnyRepresentPhoto.split(
        "/images/"
      )[1];
      const compagnyPresentationFile = data.compagnyPresentationFile.split(
        "/images/"
      )[1];
      fs.unlinkSync(`images/${compagnyLogo}`);
      fs.unlinkSync(`images/${compagnyCoverPhoto}`);
      fs.unlinkSync(`images/${compagnyRepresentPhoto}`);
      fs.unlinkSync(`images/${compagnyPresentationFile}`);
      console.log(userId);
      Membership.deleteOne({ _id: userId }, (err, res) => {
        if (err) {
          res.status(500).json({});
          return;
        }
      });
      res.json({ message: "suppression effectuée  " + userId });
    });
  },
  updateMdpMember: (req, res) => {
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
        console.log(data);
        res.status(200).json({
          memberShipId: data,
        });
      }
    );
  },
  updateMdpAdmin: (req, res) => {
    const [userMail, superAdminHashPassword] = [
      req.body.superAdminEmail,
      req.body.superAdminHashPassword,
    ];
    const hash = bcrypt.hashSync(superAdminHashPassword, 10);
    SuperAdmin.updateOne(
      { superAdminEmail: userMail },
      { superAdminHashPassword: hash },
      (err, data) => {
        if (err) {
          res.status(500).json({});
          return;
        }
        console.log(data);
        res.status(200).json({
          superAdminId: data,
        });
      }
    );
  },
};
module.exports = profil;
