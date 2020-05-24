const TestMulter = require("../models/TestMulter");
const bcrypt = require("bcrypt");

const admin = {
  insertMulter: (req, res, next) => {
    const superAdminHashPassword = req.body.superAdminHashPassword;
    const hash = bcrypt.hashSync(superAdminHashPassword, 10);
    const newTestMulter = new TestMulter({
      superAdminEmail: req.body.superAdminEmail,
      superAdminHashPassword: hash,
      image: `${req.protocol}://${req.get("host")}/images/${
        req.files.image[0].filename
      }`,
    });
    TestMulter.insertMany(newTestMulter, (err, res) => {
      if (err) {
        res.status(500).json({});
        return;
      }
    });
    res.json("Enregistrement effectué");
  },
};
module.exports = admin;
