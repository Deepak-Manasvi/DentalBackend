const Appointment = require('../Models/appointmentModels');
const Receipt = require('../Models/receiptModel');


// Create a receipt
exports.createReceipt = async (req, res) => {
  try {
    const { appId,
        uhid,
        patientName,
        mobileNumber,
        address,
        doctorName,
        opdAmount,
        paymentMode,
        transactionId,
        receptionist, } = req.body;

    const appointment = await Appointment.findOne({ uuid: uhid });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Create the receipt
    const receipt = new Receipt({
        uhid,
      totalAmount,
      paidAmount,
      paymentStatus,
      paymentMode,
      transactionId,
    });

    // Save the receipt
    await receipt.save();


    await Appointment.findByIdAndUpdate(appointmentId, {
      $push: { receipts: receipt._id },
      receiptGenerate: true, 
    });

    return res.status(201).json({ message: 'Receipt generated successfully', receipt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};
