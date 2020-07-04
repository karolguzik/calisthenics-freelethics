const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const trainingRoutes = require('./routes/trainings');
const progressRoutes = require('./routes/progress');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/progress', progressRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
