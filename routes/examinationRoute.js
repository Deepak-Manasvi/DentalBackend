const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth");
const { createExamination, getExaminationsByUHID } = require("../Controllers/examinationController");

router.post("/createExamination", auth,  isAdmin, createExamination);
router.get("/getExaminationsByUHID/:uhid", auth, getExaminationsByUHID);

module.exports = router;
