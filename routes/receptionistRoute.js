const express = require("express");
const route = express.Router();

const { getAllPatients, createPatient } = require("../Controllers/patientController");
const { getAllAppointments, createAppointment } = require("../Controllers/appointmentController");
const { createReceipt, getAllReceipts, generateInvoiceById, getAllInvoices } = require("../Controllers/billingController");

const { auth, isReceptionist } = require('../middlewares/auth');

// Patient routes
route.post("/createPatient", auth, isReceptionist, createPatient);
route.get("/getAllPatients", auth, isReceptionist, getAllPatients);

// Appointment routes
route.post("/createAppointment", auth, isReceptionist, createAppointment);
route.get("/getAllAppointments", auth, isReceptionist, getAllAppointments);

// Billing routes
route.post("/createReceipt", auth, isReceptionist, createReceipt);
route.get("/getAllReceipts", auth, isReceptionist, getAllReceipts);
route.patch("/generateInvoiceById/:id", auth, isReceptionist, generateInvoiceById);
route.get("/getAllInvoices", auth, isReceptionist, getAllInvoices);

module.exports = route;
