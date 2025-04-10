const Appointment = require("../Models/appointmentModels");
const mongoose = require("mongoose");

// ✅ GET - All Appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json({
      success: true,
      appointmentList: appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};

// ✅ POST - Book Appointment
exports.createAppointment = async (req, res) => {
  try {
    // Destructure request body
    const {
      appId,
      patientType,
      patientName,
      gender,
      mobileNumber,
      age,
      address,
      healthDetails,
      appointmentDate,
      appointmentTime,
      doctorName,
      opdAmount,
      paymentMode,
      transactionId,
      status,
    } = req.body;

    // Manual validation for required fields based on schema
    if (
      !appId ||
      !patientType ||
      !patientName ||
      !gender ||
      !mobileNumber ||
      !age ||
      !address ||
      !doctorName ||
      !opdAmount ||
      !paymentMode ||
      !status
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

  
    //data save in mongodb

    const newAppointment = new Appointment(req.body);
    const appointmentDetails = await newAppointment.save();
    return res.status(200).json({
      success: true,
      appointmentDetails,
    });
  } catch (error) {
    console.error("Error booking appointment:", error); // important
    let errorMessage = error.message;

    // Custom error for unique mobile number
    if (error.code === 11000 && error.keyPattern.mobileNumber) {
      errorMessage = "Mobile number already exists.";
    }

    return res.status(400).json({
      message: "Error booking appointment",
      error: error.message,
    });
  }
};

// ✅ Get single appointment
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      "patientDetails"
    );
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

// ✅ Edit
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating", error });
  }
};

// ✅ Cancel
exports.deleteAppointment = async (req, res) => {
  try {
    const del = await Appointment.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Appointment cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
