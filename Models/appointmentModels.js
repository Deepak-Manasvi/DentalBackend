const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appId: {
      type: String,
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
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    uhid: {
      type: String,
      unique: true,
      required: true,
    },

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
      required: false,
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "UPI"],
      required: true,
    },
    transactionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Paid", "Due"],
      required: true,
    },
    IsPatient: {
      type: Boolean,
      default: false,
      //appointment
      //patient
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
