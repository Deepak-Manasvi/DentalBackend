const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    businessName: String,
    address: String,
    contact: String,
    licenseNumber: String,
    financialYear: String,
    businessPhoto: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
