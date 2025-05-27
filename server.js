const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// import routes

// Authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Category routes
app.use('/api/categories', require('./routes/categoryRoutes'));

// Transaction routes
app.use('/api/transactions', require('./routes/transactionRoutes'));

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});