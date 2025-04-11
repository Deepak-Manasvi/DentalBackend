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
    res.status(500).json({
      success: false,
      message: "Error fetching appointments",
      error: error.message,
    });
  }
};

// ✅ POST - Book Appointment
const generateUHID = () => {
  return 'UHID-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

exports.createAppointment = async (req, res) => {
  try {
    const requiredFields = [
      "appId",
      "patientType",
      "patientName",
      "gender",
      "mobileNumber",
      "age",
      "address",
      "doctorName",
      "paymentMode",
      "status",
    ];

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required.`,
        });
      }
    }

    const uhid = generateUHID();
    const newAppointment = new Appointment({ ...req.body, uhid });
    const appointmentDetails = await newAppointment.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointmentDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error booking appointment",
      error: error.message,
    });
  }
};

// ✅ GET - Appointment by ID
// ✅ Updated controller
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
    const appointment = await Appointment.findOne({ appId: req.params.id });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching appointment",
      error: error.message,
    });
  }
};

// ✅ PUT - Update Appointment
exports.updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findOneAndUpdate(
      { appId: req.params.id },
      req.body,
      { new: true }
    );
    

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      updatedAppointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating appointment",
      error: error.message,
    });
  }
};

// ✅ DELETE - Cancel Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findOneAndDelete({ appId: req.params.id });

    if (!deletedAppointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error cancelling appointment",
      error: error.message,
    });
  }
};

exports.getPatientByUHID = async (req, res) => {
  try {
    const patient = await Appointment.findOne({ uhid: req.params.uhid });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found with this UHID",
      });
    }

    res.status(200).json({
      success: true,
      patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching patient by UHID",
      error: error.message,
    });
  }
};

exports.deletePatientByUHID = async (req, res) => {
  try {
    const deletedPatient = await Appointment.findOneAndDelete({ uhid: req.params.uhid });

    if (!deletedPatient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found with this UHID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting patient by UHID",
      error: error.message,
    });
  }
};
