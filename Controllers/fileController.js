const File = require("../Models/fileModal");
const { cloudinary } = require("../Config/cloudinary");

// @desc    Upload files
// @route   POST /api/files
// @access  Public
exports.uploadFiles = async (req, res) => {
  try {
    const uploadedFiles = req.files;
    const { note } = req.body;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const savedFiles = [];

    for (const file of uploadedFiles) {
      const newFile = new File({
        filename: file.originalname,
        fileUrl: file.path,
        fileType: file.mimetype,
        cloudinaryId: file.filename,
        note: note || "",
      });

      await newFile.save();
      savedFiles.push(newFile);
    }

    res.status(201).json(savedFiles);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message || "Failed to upload files" });
  }
};

// @desc    Get all files
// @route   GET /api/files
// @access  Public
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch files" });
  }
};

// @desc    Get a single file
// @route   GET /api/files/:id
// @access  Public
exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    res.json(file);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch file" });
  }
};

// @desc    Delete a file
// @route   DELETE /api/files/:id
// @access  Public
exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Delete from Cloudinary
    const publicId = file.cloudinaryId;
    await cloudinary.uploader.destroy(publicId);

    // Delete from database
    await File.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete file" });
  }
};
