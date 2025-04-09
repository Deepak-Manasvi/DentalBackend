const express = require("express");
const router = express.Router();
const { createExamination, getExaminationsByUHID } = require("../Controllers/examinationController");

router.post("/createExamination", createExamination);
router.get("/uhid/:uhid", getExaminationsByUHID);

module.exports = router;