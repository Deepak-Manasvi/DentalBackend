// routes/treatmentProcedure.routes.js
const express = require('express');
const router = express.Router();
const {createTreatmentProcedure, updateTreatmentProcedureById } = require('../Controllers/treatmentProcedurecontroller');

router.post('/createTreatmentProcedure', createTreatmentProcedure);
router.put('/updateTreatmentProcedureById/:id', updateTreatmentProcedureById);

module.exports = router;
