// controllers/treatmentProcedure.controller.js
const mongoose = require("mongoose");
const TreatmentProcedure = require("../Models/treatmentProceduremodel");

exports.createTreatment = async (req, res) => {
  try {
    const treatment = new TreatmentProcedure(req.body);
    await treatment.save();
    res.status(201).json(treatment);
  } catch (error) {
    res.status(400).json({ message: "Error creating treatment", error });
  }
};

exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await TreatmentProcedure.find().populate("patientId");
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatments", error });
  }
};

exports.getTreatmentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const treatment = await TreatmentProcedure.findOne({ _id: id });

    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }

    res.status(200).json(treatment);
  } catch (error) {
    console.error("Error fetching treatment:", error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateTreatment = async (req, res) => {
  try {
    const updated = await TreatmentProcedure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Treatment not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Error updating treatment", error });
  }
};

exports.deleteTreatment = async (req, res) => {
  try {
    const deleted = await TreatmentProcedure.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Treatment not found" });
    res.json({ message: "Treatment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting treatment", error });
  }
};
