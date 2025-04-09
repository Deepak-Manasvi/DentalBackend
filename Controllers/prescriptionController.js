const Prescription = require("../Models/prescriptionModel");
const mongoose = require("mongoose");

exports.createPrescription = async (req, res) => {
  try {
    const pres = new Prescription(req.body);
    await pres.save();
    res.status(201).json(pres);
  } catch (error) {
    res.status(400).json({ message: "Error creating prescription", error });
  }
};

exports.getPrescriptionByExamination = async (req, res) => {
  try {
    const data = await Prescription.findOne({ examinationId: req.params.examId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
