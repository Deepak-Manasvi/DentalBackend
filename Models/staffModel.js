const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
});

module.exports = mongoose.model('Staff', staffSchema);
