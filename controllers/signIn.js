const MemberShip = require("../models/Membership");

const controllerSignIn = {
  SignIn: (req, res) => {
    const membershipHashPassword = req.body.membershipHashPassword;

    MemberShip.insertMany(newMember, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json("Le massage a été enregisté");
  },
};
module.exports = controllerSignIn;
