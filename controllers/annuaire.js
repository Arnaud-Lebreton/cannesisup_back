const Membership = require("../models/Membership");

const annuaire = {
  allProfils: (req, res) => {
    Membership.find({}, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },

  singleProfil: (req, res) => {
    const userId = req.body._id;
    Membership.findOne({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
};
module.exports = annuaire;
