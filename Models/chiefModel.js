const mongoose = require('mongoose');

const chiefSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Chief', chiefSchema);
