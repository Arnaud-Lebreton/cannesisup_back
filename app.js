/***** Constantes modules *****/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/***** Constantes middlewares *****/
const cors = require("./middlewares/cors");

/***** Constantes Routeurs *****/
const annuaire = require("./routes/annuaire");
const profil = require("./routes/profil");
const dashbord = require("./routes/dashbord");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

/***** Lancement des Routeurs *****/
app.use("/annuaire", annuaire);
app.use("/appartement", profil);
app.use("/reservation", dashboard);
app.use("/api/auth", userRoutes);

module.exports = app;
