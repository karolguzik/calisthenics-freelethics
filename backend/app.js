const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const trainingRoutes = require('./routes/trainings');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API running'));

app.use('/api/user', userRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/trainings', trainingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));