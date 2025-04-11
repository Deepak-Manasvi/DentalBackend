const mongoose = require("mongoose");


const prescriptionSchema=new mongoose.Schema({
   appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: [true, "Appointment ID is required"]
    },
    billingDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Billing",
    },


})

module.exports = mongoose.model("Prescription", prescriptionSchema);
// const medicineSchema = new mongoose.Schema({
//   medicineName: {
//     type: String,
//     required: [true, "Medicine name is required"],
//     trim: true,
//     minlength: [2, "Medicine name must be at least 2 characters long"]
//   },
//   frequency: {
//     type: String,
//     required: [true, "Frequency is required"],
//     enum: {
//       values: ["OD", "BD", "TDS", "QID", "HS"],
//       message: "Frequency must be one of: OD, BD, TDS, QID, HS"
//     }
//   },
//   beforeFood: {
//     type: Boolean,
//     default: false
//   },
//   afterFood: {
//     type: Boolean,
//     default: false
//   },
//   duration: {
//     type: String,
//     required: [true, "Duration is required"],
//     match: [/^\d+\s(day|days|week|weeks|month|months)$/, "Duration format is invalid (e.g., '3 days')"]
//   },
//   instructions: {
//     type: String,
//     maxlength: [250, "Instructions can be max 250 characters"]
//   }
// }, { _id: false });


// const prescriptionSchema = new mongoose.Schema({
//   examinationId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Examination",
//     required: [true, "Examination ID is required"]
//   },
//   medicines: {
//     type: [medicineSchema],
//     validate: {
//       validator: function (val) {
//         return val.length > 0;
//       },
//       message: "At least one medicine is required"
//     }
//   },
//   nextAppointmentDate: {
//     type: Date,
//     validate: {
//       validator: function (val) {
//         if (!val) return true;
//         return val > new Date();
//       },
//       message: "Next appointment date must be in the future"
//     }
//   }
// }, { timestamps: true });





