const mongoose = require('mongoose');

const dentistSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model('Dentist', dentistSchema);
