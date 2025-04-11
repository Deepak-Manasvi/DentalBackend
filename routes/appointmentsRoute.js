const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,getAppointmentById,
  getAppointmentById, 
  getPatientByUHID,
   deletePatientByUHID
} = require("../Controllers/appointmentController");

router.get("/appointmentList", getAllAppointments);
router.post("/addAppointment", createAppointment);
// router.get("/getbyid/:id", getAppointmentById);
router.put("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);

module.exports = router;
