// const mongoose = require("mongoose");

// const billingSchema = new mongoose.Schema({
//   receiptNumber: { type: String, required: true, unique: true },
//   patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
//   appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
//   amount: { type: Number, required: true },
//   paymentDetails: {type: mongoose.Schema.Types.ObjectId, ref: "Payment", required: true },
//   date: { type: Date, default: Date.now },
//   invoiceGenerated: { type: Boolean, default: false },
//   invoiceDate: { type: Date }
// });

// module.exports = mongoose.model("Billing", billingSchema);


const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  receiptNumber: {
    type: String,
    required: [true, "Receipt number is required"],
    unique: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: [true, "Patient ID is required"]
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: [true, "Appointment ID is required"]
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be greater than or equal to 0"]
  },
  paymentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: [true, "Payment details are required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  invoiceGenerated: {
    type: Boolean,
    default: false
  },
  invoiceDate: {
    type: Date,
    validate: {
      validator: function (val) {
        if (this.invoiceGenerated && !val) return false;
        return true;
      },
      message: "Invoice date must be provided when invoice is generated"
    }
  }
});

module.exports = mongoose.model("Billing", billingSchema);
