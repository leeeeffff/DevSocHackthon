import express from 'express';
import cors from 'cors';
import pool from './config/db.js'; // Import db using ES module
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; // Import auth routes
import './config/passportConfig.js'; // Import passport configuration

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
    credentials: true  // Ensure cookies (session info) are included in requests
}));
app.use(express.json()); // Parse JSON info
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes); // Auth routes

// Start server
app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});
