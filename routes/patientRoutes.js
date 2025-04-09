const express = require("express");
const router = express.Router();
const { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } = require("../Controllers/patientController");

router.get("/getall", getAllPatients);
router.post("/create", createPatient);
router.put("/update/:id", updatePatient); 
router.delete("/delete:id", deletePatient); 

module.exports = router;


