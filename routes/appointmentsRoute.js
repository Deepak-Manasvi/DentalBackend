const multer = require("multer");
const path = require("path");

const express = require("express");
const router = express.Router();
const {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  getAppointmentById,
  getPatientByUHID,
  updateCheckIn,
  deletePatientByUHID,
  getAppointmentByAppId,
  addOrUpdateReceipt
} = require("../Controllers/appointmentController");

router.get("/appointmentList", getAllAppointments);
router.get("/getAppointment/:id", getAppointmentById);
router.get("/getAppointmentByAppId/:id", getAppointmentByAppId);
router.post("/addAppointment", createAppointment);
router.patch("/updateCheckIn/:id", updateCheckIn);
router.patch("/update/:id", updateAppointment);
router.delete("/delete/:id", deleteAppointment);


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `receipt-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

router.put(
  "/receipt/:id",
  upload.single("pdf"),
  addOrUpdateReceipt
);

module.exports = router;
