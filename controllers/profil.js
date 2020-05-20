const Membership = require("../models/Membership");
const profil = {
  uploadProfil: (req, res) => {
    const userId = req.body._id;
    Membership.find({ _id: userId }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json(data);
    });
  },
  saveProfil: (req, res) => {
    const [userId, body] = [req.body._id, req.body];
    Membership.updateOne({ _id: userId }, body, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      res.json({ message: "Enregistrement effectué" });
    });
  },
};
module.exports = profil;
