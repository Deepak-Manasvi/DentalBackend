const express = require("express");
const router = express.Router();
const { addProcedure, getProceduresByExamination } = require("../Controllers/procedureController");

router.post("/add", addProcedure);
router.get("/examination/:examId", getProceduresByExamination);

module.exports = router;
 

