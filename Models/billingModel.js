const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  receiptNumber: { type: String, required: true, unique: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
  amount: { type: Number, required: true },
  paymentDetails: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
  date: { type: Date, default: Date.now },
  invoiceGenerated: { type: Boolean, default: false },
  invoiceDate: { type: Date }
});

module.exports = mongoose.model("Billing", billingSchema);


