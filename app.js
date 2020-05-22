/***** Constantes modules *****/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/***** Constantes middlewares *****/
const cors = require("./middlewares/cors");
const auth = require("./middlewares/authorization");
const multer = require("./middlewares/multer-config");

/***** Constantes Routeurs *****/
const admin = require("./routes/admin");
const dashboard = require("./routes/dashboard");
const profil = require("./routes/profil");
const signIn = require("./routes/singIn");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

/***** Lancement des Routeurs *****/
app.use("/admin", admin); // accès à l'inscription
//app.use("/admin",auth, admin); // accès à l'inscription
app.use("/dashboard", dashboard); // accès aux paramètres dashboard ==> Admin uniquement
//app.use("/dashboard", auth,dashboard); // accès aux paramètres dashboard ==> Admin uniquement
app.use("/profil", profil); // accès aux profils
//app.use("/profil", multer, profil); // accès aux profils
//app.use("/profil", auth, multer, profil); // accès aux profils
app.use("/signIn", signIn); // accès aux profil

module.exports = app;
