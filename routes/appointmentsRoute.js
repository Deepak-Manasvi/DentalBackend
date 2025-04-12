const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getPatientByUHID,
  updateCheckIn,
  deletePatientByUHID,
  getAppointmentByAppId
} = require("../Controllers/appointmentController");

router.get("/appointmentList", getAllAppointments);
router.get("/getAppointment/:id", getAppointmentById);
router.get("/getAppointmentByAppId/:id", getAppointmentByAppId);
router.post("/addAppointment", createAppointment);
router.patch("/updateCheckIn/:id", updateCheckIn);
router.patch("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
