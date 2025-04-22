const express = require("express");
const router = express.Router();
const uploadFiles = require("../middlewares/uploadFiles");
const {
  getConfigurations,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
  getConfigurationById,
} = require("../Controllers/clinicConfigController");

// Get all configurations
router.get("/getUpload", getConfigurations);

// Get single configuration
router.get("/getUpload:id", getConfigurationById);

// Create new configuration
router.post("/createUpload", uploadFiles, createConfiguration);

// Update configuration
router.put("/updateUpload:id", uploadFiles, updateConfiguration);

// Delete configuration
router.delete("/deleteUpload:id", deleteConfiguration);

module.exports = router;
