const ClinicConfig = require("../Models/clinicConficModel");
const { cloudinary } = require("../Config/cloudinary");

// Get all clinic configurations
exports.getConfigurations = async (req, res) => {
  try {
    const configurations = await ClinicConfig.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      configurations,
    });
  } catch (error) {
    console.error("Error getting configurations:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching configurations",
    });
  }
};

// Create new clinic configuration
exports.createConfiguration = async (req, res) => {
  try {
    const { termsAndCondition, shareOnMail } = req.body;

    // Get file upload results from multer middleware
    const files = req.files || {};

    // Create new configuration instance
    const newConfig = new ClinicConfig({
      termsAndCondition: termsAndCondition || "",
      shareOnMail: shareOnMail === "true",
    });

    // Add header details if uploaded
    if (files.header && files.header.length > 0) {
      newConfig.headerUrl = files.header[0].path;
      newConfig.headerPublicId = files.header[0].filename;
    }

    // Add footer details if uploaded
    if (files.footer && files.footer.length > 0) {
      newConfig.footerUrl = files.footer[0].path;
      newConfig.footerPublicId = files.footer[0].filename;
    }

    // Save to database
    await newConfig.save();

    res.status(201).json({
      success: true,
      configuration: newConfig,
    });
  } catch (error) {
    console.error("Error creating configuration:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating configuration",
    });
  }
};

// Update existing clinic configuration
exports.updateConfiguration = async (req, res) => {
  try {
    const configId = req.params.id;
    const { termsAndCondition, shareOnMail } = req.body;
    const files = req.files || {};

    // Find existing configuration
    const config = await ClinicConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    // Track if we need to delete old images
    let deleteHeaderImage = false;
    let deleteFooterImage = false;

    // Update configuration fields
    config.termsAndCondition = termsAndCondition || config.termsAndCondition;
    config.shareOnMail = shareOnMail === "true";
    config.updatedAt = Date.now();

    // Update header if new one uploaded
    if (files.header && files.header.length > 0) {
      if (config.headerPublicId) {
        deleteHeaderImage = true;
      }
      config.headerUrl = files.header[0].path;
      config.headerPublicId = files.header[0].filename;
    }

    // Update footer if new one uploaded
    if (files.footer && files.footer.length > 0) {
      if (config.footerPublicId) {
        deleteFooterImage = true;
      }
      config.footerUrl = files.footer[0].path;
      config.footerPublicId = files.footer[0].filename;
    }

    // Save updated configuration
    await config.save();

    // Delete old images from Cloudinary if needed
    if (deleteHeaderImage && config.headerPublicId) {
      try {
        await cloudinary.uploader.destroy(config.headerPublicId);
      } catch (error) {
        console.error("Error deleting old header image:", error);
      }
    }

    if (deleteFooterImage && config.footerPublicId) {
      try {
        await cloudinary.uploader.destroy(config.footerPublicId);
      } catch (error) {
        console.error("Error deleting old footer image:", error);
      }
    }

    res.status(200).json({
      success: true,
      configuration: config,
    });
  } catch (error) {
    console.error("Error updating configuration:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating configuration",
    });
  }
};

// Delete clinic configuration
exports.deleteConfiguration = async (req, res) => {
  try {
    const configId = req.params.id;

    // Find configuration
    const config = await ClinicConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    // Delete images from Cloudinary
    if (config.headerPublicId) {
      try {
        await cloudinary.uploader.destroy(config.headerPublicId);
      } catch (error) {
        console.error("Error deleting header image:", error);
      }
    }

    if (config.footerPublicId) {
      try {
        await cloudinary.uploader.destroy(config.footerPublicId);
      } catch (error) {
        console.error("Error deleting footer image:", error);
      }
    }

    // Remove from database
    await config.deleteOne();

    res.status(200).json({
      success: true,
      message: "Configuration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting configuration:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting configuration",
    });
  }
};

// Get single configuration by ID
exports.getConfigurationById = async (req, res) => {
  try {
    const configId = req.params.id;

    const config = await ClinicConfig.findById(configId);
    if (!config) {
      return res.status(404).json({
        success: false,
        message: "Configuration not found",
      });
    }

    res.status(200).json({
      success: true,
      configuration: config,
    });
  } catch (error) {
    console.error("Error fetching configuration:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching configuration",
    });
  }
};
