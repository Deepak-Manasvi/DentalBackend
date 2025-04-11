const express = require('express');
const router = express.Router();
const {
  createStaff,
  getAllStaff,
  updateStaff,
  deleteStaff
} = require('../Controllers/staffController');

router.post('/createstaff', createStaff);
router.get('/getallstaff', getAllStaff);
router.put('/updatestaff:id', updateStaff);
router.delete('/deletestaff:id', deleteStaff);

module.exports = router;
