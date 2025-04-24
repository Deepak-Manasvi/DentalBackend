// routes/treatmentProcedure.routes.js
const express = require('express');
const router = express.Router();
const { createTreatmentProcedure, updateTreatmentById, getTreatmentById } = require('../Controllers/treatmentProcedurecontroller');

router.post('/createTreatmentProcedure', createTreatmentProcedure);
router.patch('/updateTreatmentById/:id', updateTreatmentById);
router.get('/getTreatmentById/:id', getTreatmentById);

module.exports = router;
