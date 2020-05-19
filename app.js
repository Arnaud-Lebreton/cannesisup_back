/***** Constantes modules *****/
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

/***** Constantes middlewares *****/
const cors = require("./middlewares/cors");

/***** Constantes Routeurs *****/
const subscribe = require("./routes/subscribe");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors.handle);

/***** Lancement des Routeurs *****/
app.use("/signUp", subscribe);

module.exports = app;
