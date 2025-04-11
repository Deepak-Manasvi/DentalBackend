const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById, 
  getPatientByUHID,
   deletePatientByUHID
} = require("../Controllers/appointmentController");

router.get("/getllAppointmentList", getAllAppointments);
router.post("/createAppointment", createAppointment);
router.get("/appointmentGetbyid/:id", getAppointmentById); 
router.put("/updateAppointment/:id", updateAppointment);
router.delete("/deleteAppointment/:id", deleteAppointment);
router.get("/getPatientByUHID/:uhid", getPatientByUHID);
router.delete("/deletePatientUHID/:uhid", deletePatientByUHID);

module.exports = router;
