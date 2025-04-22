// controllers/treatmentProcedure.controller.js
const TreatmentProcedure = require('../Models/treatmentProceduremodel');

exports.createTreatment = async (req, res) => {
  try {
    const treatment = new TreatmentProcedure(req.body);
    await treatment.save();
    res.status(201).json(treatment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating treatment', error });
  }
};

exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await TreatmentProcedure.find().populate('patientId');
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching treatments', error });
  }
};

exports.getTreatmentById = async (req, res) => {
  try {
    console.log("entered")
    const treatment = await TreatmentProcedure.findById(req.params.id).populate('patientId');
    if (!treatment) return res.status(404).json({ message: 'Treatment not found' });
    res.json(treatment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching treatment', error });
  }
};

exports.updateTreatment = async (req, res) => {
  try {
    const updated = await TreatmentProcedure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Treatment not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating treatment', error });
  }
};

exports.deleteTreatment = async (req, res) => {
  try {
    const deleted = await TreatmentProcedure.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Treatment not found' });
    res.json({ message: 'Treatment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatment', error });
  }
};


exports.saveAdultTreatmentProcedure = async (req, res) => {
  try {
    const {
      patientId,
      date,
      toothName,
      procedureDone,
      materialsUsed,
      notes,
      nextDate,
      procedures,
      medicines,
    } = req.body;

    const newRecord = new TreatmentProcedure({
      patientId,
      date,
      toothName,
      procedureDone,
      materialsUsed,
      notes,
      nextDate,
      procedures,
      medicines,
    });

    await newRecord.save();
    res.status(201).json({ success: true, message: "Treatment saved", data: newRecord });
  } catch (error) {
    console.error("Error saving treatment procedure:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
