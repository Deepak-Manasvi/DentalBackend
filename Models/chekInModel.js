const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: [true, "Appointment ID is required"],
    unique: true
  },
  uhid: {
    type: String,
    required: [true, "UHID is required"],
    unique: true
  },
  weight: {
    type: Number,
    min: [0, "Weight cannot be negative"],
    max: [500, "Weight seems too high"]
  },
  bp: {
    systolic: {
      type: Number,
      min: [50, "Systolic value too low"],
      max: [250, "Systolic value too high"]
    },
    diastolic: {
      type: Number,
      min: [30, "Diastolic value too low"],
      max: [150, "Diastolic value too high"]
    }
  },
  spo2: {
    type: Number,
    min: [50, "SpO2 too low"],
    max: [100, "SpO2 must be between 50-100"]
  },
  checkInTime: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("CheckIn", checkInSchema);
