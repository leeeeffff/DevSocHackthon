import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import './config/passportConfig.js'; // Import passport configuration

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for CORS and JSON parsing
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
    credentials: true  // Ensure cookies (session info) are included in requests
}));
app.use(express.json()); // Parse JSON info

// Logging middleware to log all requests
app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();  // Continue to the next middleware
});

// Session management
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// Initialize passport and handle session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);  // Mount auth routes

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
