const express = require("express");
const { dashboardDetails, dashboard } = require("../Controllers/dashboardController");
const { auth, isAdmin, isReceptionist } = require("../middlewares/auth");
const router = express.Router();

router.get('/admin/dashboardDetails', auth, isAdmin, dashboardDetails)
router.get('/receptionist/dashboardDetails',auth, isReceptionist, dashboard)

module.exports = router;
