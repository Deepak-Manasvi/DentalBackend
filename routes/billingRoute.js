const express = require("express");
const router = express.Router();
const billingController = require("../Controllers/billingController");


router.post("/createBill", billingController.createReceipt);

router.get("/getAllReceipts", billingController.getAllReceipts);

router.patch("/invoice/:id", billingController.generateInvoice);

router.get("/getAllInvoices", billingController.getAllInvoices);

module.exports = router;

 
