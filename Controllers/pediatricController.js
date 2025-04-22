const PediatricTreatment = require("../Models/pediatricModel");

exports.createPediatricTreatment = async (req, res) => {
  try {
    const treatment = new PediatricTreatment(req.body);
    await treatment.save();
    res.status(201).json(treatment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating pediatric treatment', error });
  }
};
