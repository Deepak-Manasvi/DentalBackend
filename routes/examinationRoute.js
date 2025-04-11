const express = require("express");
const router = express.Router();
const { createExamination, getExaminationsByUHID } = require("../Controllers/examinationController");

router.post("/createExamination", createExamination);
router.get("/getExaminationsByUHID/:uhid", getExaminationsByUHID);

module.exports = router;