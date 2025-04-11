const express = require('express');
const app = express();
const cors = require('cors');
const database = require("./Config/db")

require("dotenv").config();

const userRoutes = require("./routes/userRoute");
const receptionistRoutes = require("./routes/receptionistRoute");
const patientRoutes = require('./routes/patientRoute');
const appointmentRoutes = require('./routes/appointmentsRoute');
const checkinRoutes = require('./routes/checkInRoute');
const examinationRoutes = require('./routes/examinationRoute');
const procedureRoutes = require('./routes/procedureRoute');
const prescriptionRoutes = require('./routes/prescriptionRoute');
const billingRoutes = require("./routes/billingRoute");

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
app.use("/api/user", userRoutes);
app.use("/api/receptionist", receptionistRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/examination", examinationRoutes);
app.use("/api/procedure", procedureRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/billing", billingRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
