// routes/treatmentProcedure.routes.js
const express = require('express');
const router = express.Router();
const treatmentController = require('./controllers/treatmentProcedurecontroller.js');

router.post('/', treatmentController.createTreatment);
router.get('/', treatmentController.getAllTreatments);
router.get('/:id', treatmentController.getTreatmentById);
router.put('/:id', treatmentController.updateTreatment);
router.delete('/:id', treatmentController.deleteTreatment);

module.exports = router;
