// routes/treatmentProcedure.routes.js
const express = require('express');
const router = express.Router();
const { createTreatment, getAllTreatments, getTreatmentById, updateTreatment, deleteTreatment } = require('../Controllers/treatmentProcedurecontroller');

router.post('/createTreatment', createTreatment);
router.get('/listOfTreatments', getAllTreatments);
router.get('/getTreatment/:id', getTreatmentById);
router.put('/updateTreament/:id', updateTreatment);
router.delete('/deleteTreatment/:id', deleteTreatment);

module.exports = router;
