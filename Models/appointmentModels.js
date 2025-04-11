const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
      required: true
    },
    patientType: {
      type: String,
      enum: [
        "General Patient",
        "Emergency Patient",
        "Regular Patient",
        "Corporate Patient",
        "Insurance Patient",
      ],
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    healthDetails: {
      medicalHistory: [
        {
          type: String,
        },
      ],
      allergies: [
        {
          type: String,
        },
      ],
      weight: {
        type: Number,
      },
      bp: {
        systolic: { type: Number },
        diastolic: { type: Number },
      },
      spo2: { type: Number },
      bloodGroup: { type: String },
    },
    appointmentDate: {
      type: Date,
    },
    appointmentTime: {
      type: String,
    },
    doctorName: {
      type: String,
      required: true,
    },
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

module.exports = mongoose.model("Appointment", appointmentSchema);
