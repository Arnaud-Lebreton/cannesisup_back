const express = require("express");
const router = express.Router();
const controllerCreateMembership = require("../controllers/createMembership");

router.post("/testPost", controllerCreateMembership.createMembership);

module.exports = router;
