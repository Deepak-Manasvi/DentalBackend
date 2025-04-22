// routes/treatmentProcedure.routes.js
const express = require('express');
const router = express.Router();
const {createTreatmentProcedure, updateTreatmentProcedureById , updateTreatmentById } = require('../Controllers/treatmentProcedurecontroller');

router.post('/createTreatmentProcedure', createTreatmentProcedure);
router.patch('/updateTreatmentProcedureById/:id', updateTreatmentProcedureById);
router.patch('/updateTreatmentById/:id', updateTreatmentById);

module.exports = router;
