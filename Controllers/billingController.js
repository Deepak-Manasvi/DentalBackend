const Billing = require("../Models/billingModel.js");
const Appointment = require("../Models/appointmentModels.js");
const mongoose = require("mongoose");

// ✅ Create Receipt
exports.createReceipt = async (req, res) => {
  try {
    const receiptNumber = `RECPT-${new Date().toISOString().replace(/[-:.TZ]/g, "")}`;

    const billing = new Billing({
      ...req.body,
      receiptNumber
    });

    await billing.save();
    res.status(201).json(billing);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.errors
      });
    }
    res.status(500).json({ message: "Error creating receipt", error });
  }
};

// ✅ Get All Receipts
exports.getAllReceipts = async (req, res) => {
  try {
    const data = await Billing.find().populate("patientId appointmentId");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching receipts", error });
  }
};

// ✅ Generate Invoice
exports.generateInvoice = async (req, res) => {
  try {
    const billing = await Billing.findByIdAndUpdate(
      req.params.id,
      {
        invoiceGenerated: true,
        invoiceDate: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!billing) return res.status(404).json({ message: "Billing record not found" });

    res.status(200).json({ message: "Invoice generated", billing });
  } catch (error) {
    res.status(500).json({ message: "Error generating invoice", error });
  }
};


// ✅ List All Invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Billing.find({ invoiceGenerated: true }).populate("patientId appointmentId");
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Error fetching invoices", error });
  }
};
