const Examination = require("../Models/examinationModel");
const mongoose = require("mongoose");

exports.createExamination = async (req, res) => {
  try {
    const exam = new Examination(req.body);
    await exam.save();
    res.status(201).json(exam);
  } catch (error) {
    res.status(400).json({ message: "Error creating examination", error });
  }
};

exports.getExaminationsByUHID = async (req, res) => {
  try {
    const exams = await Examination.find({ uhid: req.params.uhid }).populate("patientId");
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
