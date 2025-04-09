const Patient = require("../Models/patientModels");
const mongoose = require("mongoose");

// ✅ GET - All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
};

// ✅ GET - Single Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
};

// ✅ POST - Create Patient
exports.createPatient = async (req, res) => {
  try {
    console.log("Request body:", req.body); // 👈 DEBUG
    const newPatient = await Patient.create(req.body);
    res.status(201).json({ message: "Patient created successfully", data: newPatient });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(400).json({ message: "Error creating patient", error });
  }
};

// ✅ PUT - Update Patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true });
    if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
};

// ✅ DELETE - Remove Patient
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting patient", error });
  }
};
