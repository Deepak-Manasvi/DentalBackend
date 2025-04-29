const express = require("express");
const router = express.Router();
const { upload } = require("../Config/cloudinary");
const {
  uploadFiles,
  getFiles,
  getFileById,
  deleteFile,
} = require("../Controllers/fileController");

// Handle file uploads
router.post("/fileUpload", upload.array("files", 5), uploadFiles);

// Get all files
router.get("/getfileUpload", getFiles);

// Get a single file by ID
router.get("/getfileUploadBy:id", getFileById);

// Delete a file
router.delete("/deletefileUploadBy:id", deleteFile);

module.exports = router;
