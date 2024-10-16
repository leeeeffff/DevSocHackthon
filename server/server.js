const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes

const app = express();

app.use(cors());
app.use(express.json());

// Add logging middleware to log all requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();  // Continue to the next middleware
});

// Use the auth routes
app.use('/api/auth', authRoutes);  // Mount the routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
