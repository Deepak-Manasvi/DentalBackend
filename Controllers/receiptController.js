const Appointment = require("../Models/appointmentModels");
const Receipt = require("../Models/receiptModel");

exports.createReceipt = async (req, res) => {
  try {
    const {
      appId,
      receiptId,
      totalAmount,
      paidAmount,
      paymentStatus,
      patientName,
      mobileNumber,
      address,
      doctorName,
      opdAmount,
      paymentMode,
      transactionId,
      branchId,
      receptionist,
      treatmentType,
    } = req.body;

    const appointment = await Appointment.findOne({ appId });
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const receipt = new Receipt({
      receiptId,
      appointmentId: appointment._id,
      totalAmount,
      paidAmount,
      paymentStatus,
      transactionId,
      paymentMode,
      patientName,
      mobileNumber,
      address,
      doctorName,
      opdAmount,
      branchId,
      receptionist,
      treatmentType,
    });

    await receipt.save();

    await Appointment.findByIdAndUpdate(appointment._id, {
      $push: { receipts: receipt._id },
      receiptGenerate: true,
    });

    return res.status(201).json({ message: "Receipt generated successfully", receipt });
  } catch (error) {
    console.error("Error creating receipt:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
