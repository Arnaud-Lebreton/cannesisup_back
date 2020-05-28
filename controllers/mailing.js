const sendMail = require("../middlewares/mail");
const SuperAdmin = require("../models/SuperAdmin");
const Membership = require("../models/Membership");

const mailing = {
  mdp: (req, res, next) => {
    email = req.body.membershipEmail;
    subject = "Réinitialisation du mot de passe Cannes Is Up";
    html =
      "<h1>Cannes Is Up</h1><a href='http://localhost:3000/initpassword'>Cliquez sur le lien pour accéder à la page..</a>";
    sendMail(email, subject, html);
    res.json({ message: "email envoyé" });
  },
  subscribe: (req, res, next) => {
    email = req.body.membershipEmail;

    subject = "Prise en compte de votre inscription Cannes Is Up";
    html =
      "<h1>Cannes Is Up</h1><p>Votre demande d'inscription a été enregistrée, en attente de validation...</p>";
    sendMail(email, subject, html);

    //Admin
    SuperAdmin.findOne({}, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      superAdminEmail = data.superAdminEmail;
      email = superAdminEmail;
      subject = "Notification d'inscription Cannes Is UP";
      html =
        "<h1>Cannes Is Up</h1><p>Une inscription en attente de validation</p>";
      sendMail(email, subject, html);
    });
    res.json({ message: "email envoyé" });
  },
  //Activation
  activate: (req, res, next) => {
    _id = req.body._id;
    Membership.findOne({ _id: _id }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      email = data.membershipEmail;
      console.log(data);
      subject = "Félicitation !! Votre profil a été activé sur Cannes Is Up";
      html =
        "<h1>Cannes Is Up</h1><a href='http://localhost:3000/login'>Cliquez sur le lien pour accéder à la page de connexion..</a>";
      sendMail(email, subject, html);
      res.json({ message: "email envoyé" });
    });
  },
};
module.exports = mailing;
