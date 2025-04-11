const Examination = require("../Models/examinationModel");
const mongoose = require("mongoose");

exports.createExamination = async (req, res) => {
  try {
    const { patientId, uhid, appointmentId, type, teethDetails } = req.body;
    // Required fields
    if (!patientId || !uhid || !appointmentId || !type) {
      return res.status(400).json({ message: "patientId, uhid, appointmentId, and type are required." });
    }

    // ObjectId validations
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      return res.status(400).json({ message: "Invalid patient ID." });
    }

    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointment ID." });
    }

    // Type validation
    const allowedTypes = ["Adult", "Pediatric"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: `Invalid type. Allowed values are: ${allowedTypes.join(", ")}` });
    }

    // Teeth details validation
    if (teethDetails && Array.isArray(teethDetails)) {
      const maxTooth = type === "Adult" ? 32 : 20;

      for (const tooth of teethDetails) {
        if (
          typeof tooth.toothNumber !== "number" ||
          tooth.toothNumber < 1 ||
          tooth.toothNumber > maxTooth
        ) {
          return res.status(400).json({
            message: `Each toothNumber must be a number between 1 and ${maxTooth} for ${type} type.`,
          });
        }

        if (!tooth.dentalCondition || typeof tooth.dentalCondition !== "string") {
          return res.status(400).json({
            message: "Each teeth detail must include a valid dentalCondition (string).",
          });
        }
      }
    }

    //save to db 
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
