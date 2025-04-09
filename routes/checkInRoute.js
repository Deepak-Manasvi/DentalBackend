const express = require("express");
const router = express.Router();
const { createCheckIn, getCheckInByAppointmentId } = require("../Controllers/checkInController");

router.post("/create", createCheckIn);
router.get("/:appointmentId", getCheckInByAppointmentId);

module.exports = router;
