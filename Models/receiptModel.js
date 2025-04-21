const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    receiptId: {
      type: String,
      required: true,
      unique: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending", "Partially Paid"],
      required: true,
    },
    receiptDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
      required: false,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "UPI"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", receiptSchema);
