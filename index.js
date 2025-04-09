const express = require('express');
const app = express();
const cors = require('cors');
const database = require("./Config/db")

require("dotenv").config(); 


const receptionistRoutes = require("./routes/receptionistRoute");
const adminRoutes = require("./routes/adminRoute");
const patientRoute = require('./routes/patientRoutes');
const appointmentRoute = require('./routes/appointmentsRoute');
const checkinRoute = require('./routes/checkInRoute');
const examinationRoute = require('./routes/examinationRoute');
const procedureRoute = require('./routes/procedureRoute');
const prescriptionRoute = require('./routes/prescriptionRoute');
const billingRoute = require("./routes/billingRoute");

//cors
const corsOptions = {
    origin: [
    'http://localhost:5173',
   
    ],
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


// Middleware
app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true })); // to parse form-data

database.connectDb()


// Routes
app.use("/api/receptionist", receptionistRoutes);
app.use("/api", adminRoutes);
app.use("/api/patients", patientRoute);
app.use("/api", appointmentRoute);
app.use("/api/checkin", checkinRoute);
app.use("/api/examinations", examinationRoute);
app.use("/api/procedures", procedureRoute);
app.use("/api/prescriptions", prescriptionRoute);
app.use("/api/billing", billingRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
