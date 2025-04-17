// models/treatmentProcedure.model.js
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  dosage: String,
  timing: String,
});

const procedureSchema = new mongoose.Schema({
  procedure: String,
  cost: Number,
  remarks: String,
});

const treatmentProcedureSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  procedures: [procedureSchema],
  todayTreatment: String,
  prescribedMedicines: [medicineSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TreatmentProcedure', treatmentProcedureSchema);
