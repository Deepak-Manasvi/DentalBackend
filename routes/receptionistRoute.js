const express = require("express");
const route = express.Router();
const patientController = require("../Controllers/patientController");
const appointmentController = require("../Controllers/appointmentController");
const billingController = require("../Controllers/billingController");

const { auth, isReceptionist } = require('../middlewares/auth');

// Patient routes
route.get("/patients", auth, isReceptionist, patientController.getAllPatients);
route.post("/patients", auth, isReceptionist, patientController.createPatient);

// Appointment routes
route.get("/appointments", auth, isReceptionist, appointmentController.getAllAppointments);
route.post("/appointments", auth, isReceptionist, appointmentController.createAppointment);

// Billing routes
route.post("/billing/create", auth, isReceptionist, billingController.createReceipt);
route.get("/billing/receipts", auth, isReceptionist, billingController.getAllReceipts);
route.patch("/billing/invoice/:id", auth, isReceptionist, billingController.generateInvoice);
route.get("/billing/invoices", auth, isReceptionist, billingController.getAllInvoices);

module.exports = route;
