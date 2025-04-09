const mongoose = require("mongoose");

const teethDetailsSchema = new mongoose.Schema({
  toothNumber: Number,
  dentalCondition: String
}, { _id: false });

const examinationSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  uhid: { type: String, required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },

  type: { type: String, enum: ["Adult", "Pediatric"], required: true },
  teethDetails: [teethDetailsSchema],

  chiefComplaint: String,
  examinationNotes: String,
  advice: String
}, { timestamps: true });

module.exports = mongoose.model("Examination", examinationSchema);


