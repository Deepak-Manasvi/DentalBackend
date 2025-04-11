const Examination = require("../Models/examinationModel");
const Appointment = require("../Models/appointmentModels");
const mongoose=require("mongoose")
// Create Examination
exports.createExamination = async (req, res) => {
  try {
    const {
      appointmentId,
      type,
      teethDetails,
      chiefComplaint,
      examinationNotes,
      advice
    } = req.body;
console.log("appointmentId",typeof(appointmentId))
console.log("type",type)
    // Find appointment to fetch UHID
    const objectId =new mongoose.Types.ObjectId(appointmentId);

    const appointment = await Appointment.findById(objectId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found with this ID",
      });
    }

    const uhid = appointment.uhid;

    

    const newExamination = new Examination({
      appointmentId,
      uhid,
      type,
      teethDetails,
      chiefComplaint,
      examinationNotes,
      advice,
   
    });

    const saved = await newExamination.save();

    res.status(201).json({
      success: true,
      message: "Examination saved successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Error saving examination:", error);
    res.status(500).json({
      success: false,
      message: "Error saving examination",
      error: error.message,
    });
  }
};

// Get examinations by UHID
exports.getExaminationsByUHID = async (req, res) => {
  try {
    const { uhid } = req.params;
    const exams = await Examination.find({ uhid }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error("Error fetching examinations:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching examinations",
      error: error.message,
    });
  }
};
