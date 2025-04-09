const Procedure = require("../Models/procedureModel");
const mongoose = require("mongoose");

exports.addProcedure = async (req, res) => {
  try {
    const proc = new Procedure(req.body);
    await proc.save();
    res.status(201).json(proc);
  } catch (error) {
    res.status(400).json({ message: "Error adding procedure", error });
  }
};

exports.getProceduresByExamination = async (req, res) => {
  try {
    const data = await Procedure.find({ examinationId: req.params.examId });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
