const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createBusiness,
  getBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} = require("../Controllers/businessController");

// Multer Setup
const storage = multer.diskStorage({});
const upload = multer({ storage });

// Routes
router.post("/create-business", upload.single("businessPhoto"), createBusiness);
router.get("/getbusiness", getBusinesses);
router.get("/getbusinessBy:id", getBusinessById);
router.put("/updatebusiness:id", upload.single("businessPhoto"), updateBusiness);
router.delete("/deletebusiness:id", deleteBusiness);

module.exports = router;
