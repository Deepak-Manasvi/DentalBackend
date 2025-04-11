const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    opdAmount: {
      type: Number,
      required: true
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "UPI"],
      required: true,
    },
    transactionId: {
      type: String
    },
    status: {
      type: String,
      enum: ["Paid", "Due"],
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
