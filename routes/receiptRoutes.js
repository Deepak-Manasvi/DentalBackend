const express = require('express');
const router = express.Router();
const receiptController = require('../Controllers/receiptController');

// Route to create a receipt
router.post('/create', receiptController.createReceipt);

module.exports = router;
