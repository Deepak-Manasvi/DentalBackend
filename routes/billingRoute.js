const express = require("express");
const router = express.Router();
const {
    createReceipt,
    getAllReceipts,
    generateInvoiceById,
    getAllInvoices,
} = require("../Controllers/billingController");

router.post("/createBill", createReceipt);
router.get("/getAllReceipts", getAllReceipts);
router.patch("/generateInvoiceById/:id", generateInvoiceById);
router.get("/getAllInvoices", getAllInvoices);

module.exports = router;


