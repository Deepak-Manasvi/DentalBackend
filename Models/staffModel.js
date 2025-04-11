const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: {
    type: String,
  },
  fullName: String,
  email: String,
  password: String,
  contact: String,
  address: String,
  username: String
});

module.exports = mongoose.model('Staff', staffSchema);
