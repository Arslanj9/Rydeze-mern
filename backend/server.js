require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const publishRoutes = require('./routes/publishRoutes');
const requestRoutes = require('./routes/requestRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
// const allowedOrigins = ['https://rydpool.com', 'https://www.rydpool.com', 'https://localhost:5000', 'https://localhost:5173']; // Add your domain and local development origin
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Allow cookies if needed
}));



// Serve the folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Example API Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/publish', publishRoutes);
app.use('/api/request', requestRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
