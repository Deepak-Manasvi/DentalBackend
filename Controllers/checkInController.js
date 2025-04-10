const CheckIn = require("../Models/chekInModel");
const Appointment = require("../Models/appointmentModels");
const mongoose = require("mongoose");

// 🔄 Generate UHID and save check-in
exports.createCheckIn = async (req, res) => {
  try {
    const { appointmentId, weight, bp, spo2 } = req.body;

    // Check if the appointment already has a check-in
    const existing = await CheckIn.findOne({ appointmentId });
    if (existing) {
      return res.status(400).json({ message: "This appointment already has a check-in" });
    }

    // Validate appointmentId existence in Appointment collection
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Generate UHID
    const uhid = "UHID-" + appointmentId.toString().slice(-4) + "-" + Date.now();

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
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation Error", errors: error.errors });
    }
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
