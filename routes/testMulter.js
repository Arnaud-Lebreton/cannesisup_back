//test multer
const express = require("express");
const routerTestMulter = express.Router();
const testMulter = require("../controllers/testMulter");
const multer = require("../middlewares/multer");

routerTestMulter.post("/", multer, testMulter.insertMulter);
routerTestMulter.put("/", multer, testMulter.insertMulter);
module.exports = routerTestMulter;
