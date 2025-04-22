const express = require('express');
const router = express.Router();
const { createReceipt, getAllReceipts, getReceiptById, updateReceiptById, deleteReceiptById } = require('../Controllers/receiptController');

// Route to create a receipt
router.post('/create', createReceipt);
router.get('/getAllReceipts', getAllReceipts);
router.get('/getReceiptById/:id', getReceiptById);
router.patch('/updateReceiptById/:id', updateReceiptById);
router.delete('/deleteReceiptById/:id', deleteReceiptById);

module.exports = router;
