const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
