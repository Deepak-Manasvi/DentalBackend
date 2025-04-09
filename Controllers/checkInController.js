const CheckIn = require("../Models/chekInModel");
const Appointment = require("../Models/appointmentModels");
const mongoose = require("mongoose");

// 🔄 Generate UHID and save check-in
exports.createCheckIn = async (req, res) => {
  try {
    const { appointmentId, weight, bp, spo2 } = req.body;

    // Generate UHID: Random string + timestamp
    const uhid = "UHID-" + appointmentId.slice(-4) + "-" + Date.now();

    const checkIn = new CheckIn({
      appointmentId,
      uhid,
      weight,
      bp,
      spo2
    });

    await checkIn.save();
    res.status(201).json(checkIn);
  } catch (error) {
    res.status(500).json({ message: "Check-in failed", error });
  }
};

// ✅ Get check-in data
exports.getCheckInByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const data = await CheckIn.findOne({ appointmentId }).populate("appointmentId");
    if (!data) return res.status(404).json({ message: "Check-in not found" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving check-in", error });
  }
};
