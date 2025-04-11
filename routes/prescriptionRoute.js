const express = require("express");
const router = express.Router();

const { createPrescription, getPrescriptionByExamination } = require("../Controllers/prescriptionController");

router.post("/create", createPrescription);
router.get("/examination/:examId", getPrescriptionByExamination);

module.exports = router;


