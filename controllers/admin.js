const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcrypt");

const admin = {
  insertAdmin: (req, res, next) => {
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
module.exports = admin;
