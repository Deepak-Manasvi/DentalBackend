const Patient = require("../Models/patientModels");

// ✅ GET - All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    return res.status(200).json({
      status: 200,
      message: "Patients fetched successfully.",
      data: patients
    });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while fetching patients.",
      error: error.message
    });
  }
};

// ✅ GET - Single Patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        status: 404,
        message: "Patient not found with the given ID."
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Patient fetched successfully.",
      data: patient
    });
  } catch (error) {
    console.error("Error fetching patient by ID:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while fetching patient.",
      error: error.message
    });
  }
};

// ✅ POST - Create Patient
exports.createPatient = async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    return res.status(201).json({
      status: 201,
      message: "Patient created successfully.",
      data: newPatient
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(400).json({
      status: 400,
      message: "Validation error: Failed to create patient.",
      error: error.message
    });
  }
};

// ✅ PUT - Update Patient
exports.updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({
        status: 404,
        message: "Patient not found with the given ID."
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Patient updated successfully.",
      data: updatedPatient
    });
  } catch (error) {
    console.error("Error updating patient:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while updating patient.",
      error: error.message
    });
  }
};

// ✅ DELETE - Remove Patient
exports.deletePatient = async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return res.status(404).json({
        status: 404,
        message: "Patient not found with the given ID."
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Patient deleted successfully."
    });
  } catch (error) {
    console.error("Error deleting patient:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while deleting patient.",
      error: error.message
    });
  }
};
