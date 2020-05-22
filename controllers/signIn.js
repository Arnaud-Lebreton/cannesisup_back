const Membership = require("../models/Membership");
const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const signIn = {
  signInMembership: (req, res, next) => {
    const [membershipEmail, membershipHashPassword] = [
      req.body.membershipEmail,
      req.body.membershipHashPassword,
    ];

    Membership.findOne({ membershipEmail: membershipEmail })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Membre inexistant" });
        }
        bcrypt
          .compare(membershipHashPassword, user.membershipHashPassword)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            }
            const token = jwt.sign(
              {
                membershipId: user._id,
              },
              config.tokenCode,
              {
                expiresIn: "24h",
              }
            );
            res.status(200).json({
              //user: user,
              membershipId: user._id,
              token: token,
            });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
  signInSuperAdmin: (req, res, next) => {
    const [superAdminEmail, superAdminHashPassword] = [
      req.body.superAdminEmail,
      req.body.superAdminHashPassword,
    ];

    SuperAdmin.findOne({ superAdminEmail: superAdminEmail })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: "Membre inexistant" });
        }
        bcrypt
          .compare(superAdminHashPassword, user.superAdminHashPassword)
          .then((valid) => {
            if (!valid) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect" });
            }
            const token = jwt.sign(
              {
                superAdminId: user._id,
              },
              config.tokenCode,
              {
                expiresIn: "24h",
              }
            );
            res.status(200).json({
              superAdminId: user._id,
              token: token,
            });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
};
module.exports = signIn;
