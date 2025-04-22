const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: String,
    dosage: String,
    timing: String,
  },
  { _id: false }
);

const procedureSchema = new mongoose.Schema(
  {
    procedure: String,
    cost: Number,
    remarks: String,
    uhid:String,
  },
  { _id: true }
);

const treatmentProcedureSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: false,
  },
  procedures: [procedureSchema],
  todayTreatment: String,
  prescribedMedicines: [medicineSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

treatmentProcedureSchema.index({ patientId: 1, createdAt: -1 });

module.exports = mongoose.model("TreatmentProcedure", treatmentProcedureSchema);
