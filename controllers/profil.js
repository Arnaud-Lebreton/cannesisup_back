const Membership = require("../models/Membership");
const bcrypt = require("bcrypt");

const profil = {
  insertSingleProfil: (req, res, next) => {
    const membershipHashPassword = req.body.membershipHashPassword;
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    const data = req.body;
    data.membershipHashPassword = hash;
    data.memberActive = "non";
    for (element in data) {
      if (data[element] === "") {
        data[element] = " ";
      }
    }
    MemberShip.insertMany(data, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json({ message: "Enregistrement effectué" });
  },
  findSingleProfil: (req, res) => {
    const userId = req.query.id;
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
  updateProfil: (req, res) => {
    let userId = req.body._id;
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
    const [userId, membershipHashPassword] = [
      req.body._id,
      req.body.membershipHashPassword,
    ];
    const hash = bcrypt.hashSync(membershipHashPassword, 10);
    Membership.updateOne(
      { _id: userId },
      { membershipHashPassword: hash },
      (err, data) => {
        if (err) {
          res.status(500).json({});
          return;
        }
        res.json(data);
      }
    );
  },
};
module.exports = profil;
