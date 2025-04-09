const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicineName: String,
  frequency: String, // e.g., OD, BD, TDS
  beforeFood: Boolean,
  afterFood: Boolean,
  duration: String, // e.g., 3 days
  instructions: String
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  examinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Examination", required: true },
  medicines: [medicineSchema],
  nextAppointmentDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);


