require('express-async-errors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.js');
const drugRoutes = require('./routes/drug.js');
const medicationRoutes = require('./routes/medication.js')
const vitalSignRoutes = require('./routes/vitalSigns')
const doctorRouter = require('./routes/doctor')
const patientRouter = require('./routes/patient')
const reviewRouter = require('./routes/review')
const pharmaRoutes = require('./routes/pharma_inc')
const notificationsRoutes = require('./routes/notifications')
const cookieParser = require('cookie-parser');


const errorHandller = require('./middleware/error-handler')

dotenv.config();


const app = express();

app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(cookieParser(process.env.jwt_secret_key));
// middlewares

app.use("/api/auth", authRoutes);
app.use('/api/drug', drugRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/vitalSign', vitalSignRoutes);
app.use('/api/doctor', doctorRouter);
app.use('/api/patient', patientRouter)
app.use('/api/review', reviewRouter)
app.use('/api/pharma', pharmaRoutes)
app.use('/api/notification', notificationsRoutes)
app.use(errorHandller);


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(process.env.PORT, () => console.log('Backend server is running'));
}).catch(err => console.log(err))