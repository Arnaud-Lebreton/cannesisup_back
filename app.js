/***** Constantes modules *****/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/***** Constantes middlewares *****/
const cors = require("./middlewares/cors");

/***** Constantes Routeurs *****/
const admin = require("./routes/admin");
const dashboard = require("./routes/dashboard");
const profil = require("./routes/profil");
const signIn = require("./routes/singIn");
const testMulter = require("./routes/testMulter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

/***** Lancement des Routeurs *****/
app.use("/admin", admin); // accès à l'inscription
app.use("/dashboard", dashboard); // accès aux paramètres dashboard ==> Admin uniquement
app.use("/profil", profil); // accès aux profils
app.use("/signIn", signIn); // accès aux profil

//Test Multer //
app.use("/testMulter", testMulter); // accès aux profil
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
