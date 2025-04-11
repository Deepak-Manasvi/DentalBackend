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
   deletePatientByUHID
} = require("../Controllers/appointmentController");

router.get("/appointmentList", getAllAppointments);
router.post("/addAppointment", createAppointment);
router.patch("/updateCheckIn/:id", updateCheckIn);
router.put("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
