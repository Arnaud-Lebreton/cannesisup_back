const Membership = require("../models/Membership");
const SuperAdmin = require("../models/SuperAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config.json");

const signIn = {
  signIn: (req, res, next) => {
    const [
      superAdminEmail,
      superAdminHashPassword,
      membershipEmail,
      membershipHashPassword,
    ] = [
      req.body.membershipEmail,
      req.body.membershipHashPassword,
      req.body.membershipEmail,
      req.body.membershipHashPassword,
    ];

    SuperAdmin.findOne({ superAdminEmail: superAdminEmail })
      .then((user) => {
        if (!user) {
          console.log("Pas ok member");
          console.log(user);
          Membership.findOne({ membershipEmail: membershipEmail })
            .then((user) => {
              if (!user) {
                console.log("Pas ok member");
                console.log(user);
                return res.status(401).json({ message: "Membre inexistant" });
              } else {
                console.log("ok member");
                console.log(user);
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
              }
            })
            .catch((error) => {
              res.status(500).json({ error: error });
            });
        } else {
          console.log("ok admin");
          console.log(user);
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
                statut: "admin",
              });
            })
            .catch((error) => {
              res.status(500).json({ error: error });
            });
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  },
};
module.exports = signIn;
