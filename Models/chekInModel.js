const mongoose = require("mongoose");


const checkInSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true, unique: true },
    uhid: { type: String, required: true, unique: true },
    weight: { type: Number },
    bp: {
      systolic: Number,
      diastolic: Number
    },
    spo2: { type: Number },
    checkInTime: { type: Date, default: Date.now }
  }, { timestamps: true });
  
  module.exports = mongoose.model("CheckIn", checkInSchema);


  