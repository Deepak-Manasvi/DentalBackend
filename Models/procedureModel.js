const mongoose = require("mongoose");

const procedureSchema = new mongoose.Schema({
  examinationId: { type: mongoose.Schema.Types.ObjectId, ref: "Examination", required: true },

  procedureName: String,
  treatmentName: String,
  sittingRequired: Number,
  cost: Number
}, { timestamps: true });

module.exports = mongoose.model("Procedure", procedureSchema);


