const sendMail = require("../middlewares/mail");
const SuperAdmin = require("../models/SuperAdmin");

const mailing = {
  mdp: (req, res, next) => {
    email = req.body.membershipEmail;
    subject = "Réinitialisation du mot de passe Cannes Is Up";
    html =
      "<a href='http://localhost:3000/initpassword'>Cliquez sur le lien pour accéder à la page..</a>";
    sendMail(email, subject, html);
    res.json({ message: "email envoyé" });
  },

  subscribe: (req, res, next) => {
    email = req.body.membershipEmail;

    subject = "Prise en compte de votre inscription Cannes Is Up";
    html =
      "<p>Votre demande d'inscription a été enregistrée, en attente de validation...</p>";
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
      html = "<p>Une inscriptio en attente de validation</p>";
      sendMail(email, subject, html);
    });
    res.json({ message: "email envoyé" });
  },
  //Activation
  activate: (req, res, next) => {
    _id = req.body._id;
    SuperAdmin.findOne({ _id: _id }, (err, data) => {
      if (err) {
        res.status(500).json({});
        return;
      }
      email = data.membershipEmail;
      subject = "Félicitation !! Votre profil a été activé sur Cannes Is Up";
      html =
        "<a href='http://localhost:3000/login'>Cliquez sur le lien pour accéder à la page de connexion..</a>";
      sendMail(email, subject, html);
    });
    res.json({ message: "email envoyé" });
  },
};

module.exports = mailing;
