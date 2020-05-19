const MemberShip = require("../models/Membership");

const controllerCreateMembership = {
  createMembership: (req, res) => {
    let text = "text";
    MemberShip.insertMany(text, (err, res) => {
      if (err) {
        res.status(500).json({ message: "erreur" });
        return;
      }
      res.json({ message: "L'inscription a été enregisté" });
    });
  },
};
module.exports = controllerCreateMembership;
