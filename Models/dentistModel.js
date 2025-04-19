const mongoose = require("mongoose");

const dentistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  contact: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  opdAmount: { type: String }, // If you are storing this
  timeSlots: [{ type: String }], // Optional: customize slot format
  branch: { type: String, required: true }, // ✅ Add this
});

module.exports = mongoose.model("Dentist", dentistSchema);
