const TreatmentProcedure = require("../Models/treatmentProceduremodel");
const Appointment = require("../Models/appointmentModels");
const mongoose = require("mongoose")

// Create Examination
exports.createTreatmentProcedure = async (req, res) => {
  try {
    const {
      appointmentId,
      type,
      treatments,
      chiefComplaint,
      examinationNotes,
      advice
    } = req.body;

    // Find appointment to fetch UHID
    const objectId = new mongoose.Types.ObjectId(appointmentId);
    const appointment = await Appointment.findById(objectId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found with this ID",
      });
    }

    const uhid = appointment.uhid;
    // Convert treatments to teethDetails
    const teethDetails = treatments.flatMap((treatment) => {
      const toothNames = treatment.toothName.split(',').map(name => name.trim());
      return toothNames.map(name => ({
        toothNumber: mapToothNameToNumber(name),
        dentalCondition: treatment.dentalCondition,
      }));
    });

    const newExamination = new TreatmentProcedure({
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
      message: "Treatment saved successfully",
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

exports.updateTreatmentProcedureById = async (req, res) => {
  try {
    const { examinationId } = req.params;
    const { treatments, chiefComplaint, examinationNotes, advice } = req.body;

    if (!Array.isArray(treatments) || treatments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Treatments array is required and cannot be empty.",
      });
    }

    // Generate teethDetails from all treatments
    const teethDetails = treatments.flatMap((treatment) => {
      const toothNames = treatment.toothName.split(",").map(name => name.trim());
      return toothNames.map(name => ({
        toothNumber: mapToothNameToNumber(name),
        dentalCondition: treatment.dentalCondition,
      }));
    });

    // Pick the latest treatment for individual fields
    const latest = treatments[treatments.length - 1];

    const updatedExamination = await TreatmentProcedure.findByIdAndUpdate(
      examinationId,
      {
        teethDetails,
        chiefComplaint,
        examinationNotes,
        advice,
        procedureDone: latest?.procedureDone || "",
        toothName: latest?.toothName || "",
        procedures: treatments.map(t => t.dentalCondition),
        materialsUsed: latest?.materialsUsed?.split(",").map(m => m.trim()) || [],
        medicines: latest?.medicines || [],
        notes: latest?.notes || "",
        date: latest?.date || new Date(),
        nextDate: latest?.nextDate || null,
      },
      { new: true }
    );

    if (!updatedExamination) {
      return res.status(404).json({
        success: false,
        message: "Examination not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Examination updated successfully",
      data: updatedExamination,
    });
  } catch (error) {
    console.error("Error updating examination:", error);
    res.status(500).json({
      success: false,
      message: "Error updating examination",
      error: error.message,
    });
  }
};
exports.updateTreatmentById = async (req, res) => {
  try {
    const treatmentId = req.params.id;
    const { procedureList, medicines, materialsUsed } = req.body;

    if (!treatmentId) {
      return res.status(400).json({
        success: false,
        message: "Treatment ID is required",
      });
    }

    // For backward compatibility, extract procedure names
    const procedureNames = procedureList ? procedureList.map(item => item.procedure) : [];
    
    // For backward compatibility, extract medicine names
    const medicineNames = medicines ? medicines.map(item => item.name) : [];
    
    // Build update object
    const updateData = {
      // Store the complex objects directly
      procedureList: procedureList || [],
      medicines: medicines || [],
      materialsUsed: materialsUsed || {},
      
      // Also update the simple fields for backward compatibility
      procedures: procedureNames,
      toothName: materialsUsed?.toothName || "",
      procedureDone: materialsUsed?.procedureDone || "",
      notes: materialsUsed?.notes || "",
    };
    
    // Handle date fields
    if (materialsUsed?.date) {
      updateData.date = new Date(materialsUsed.date);
    }
    
    if (materialsUsed?.nextDate && materialsUsed.nextDate !== "") {
      updateData.nextDate = new Date(materialsUsed.nextDate);
    }

    // Find and update the treatment procedure
    const updatedTreatment = await TreatmentProcedure.findByIdAndUpdate(
      treatmentId,
      updateData,
      { new: true }
    );

    if (!updatedTreatment) {
      return res.status(404).json({
        success: false,
        message: "Treatment procedure not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Treatment procedure updated successfully",
      data: updatedTreatment,
    });
  } catch (error) {
    console.error("Error updating treatment procedure:", error);
    res.status(500).json({
      success: false,
      message: "Error updating treatment procedure",
      error: error.message,
    });
  }
};

function mapToothNameToNumber(toothName) {
  const toothMap = [
    "Upper Right Third Molar",
    "Upper Right Second Molar",
    "Upper Right First Molar",
    "Upper Right Second Premolar",
    "Upper Right First Premolar",
    "Upper Right Canine",
    "Upper Right Lateral Incisor",
    "Upper Right Central Incisor",
    "Upper Left Central Incisor",
    "Upper Left Lateral Incisor",
    "Upper Left Canine",
    "Upper Left First Premolar",
    "Upper Left Second Premolar",
    "Upper Left First Molar",
    "Upper Left Second Molar",
    "Upper Left Third Molar",
    "Lower Left Third Molar",
    "Lower Left Second Molar",
    "Lower Left First Molar",
    "Lower Left Second Premolar",
    "Lower Left First Premolar",
    "Lower Left Canine",
    "Lower Left Lateral Incisor",
    "Lower Left Central Incisor",
    "Lower Right Central Incisor",
    "Lower Right Lateral Incisor",
    "Lower Right Canine",
    "Lower Right First Premolar",
    "Lower Right Second Premolar",
    "Lower Right First Molar",
    "Lower Right Second Molar",
    "Lower Right Third Molar",
  ];

  return toothMap.indexOf(toothName) + 1;
}