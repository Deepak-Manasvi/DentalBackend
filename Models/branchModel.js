const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    pincode: {
        type: String,
    },
});

module.exports = mongoose.model('Branch', branchSchema);


