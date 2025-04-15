const express = require("express");
const { dashboardDetails } = require("../Controllers/dashboardController");
const router = express.Router();

router.get('/dashboardDetails',dashboardDetails )

module.exports = router;
