import express from 'express';
import passport from 'passport'; // Import passport for OAuth handling
import { loginUser } from '../controllers/authController.js'; // Use ES module import and add .js extension
import pool from '../config/db.js';

const router = express.Router();

// Login route
router.post('/login', loginUser);

// Normal Signup route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, password] // Make sure to hash the password using bcrypt
        );
        res.status(201).json({ message: 'User created', user: newUser.rows[0] });
    } catch (error) {
        console.error('Error during sign-up', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Google OAuth route
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// Google OAuth callback route
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard or home
        res.redirect('/dashboard');  // Adjust the redirect as needed for your app
    }
);

// GitHub OAuth route
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// GitHub OAuth callback route
router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect to dashboard or home
        res.redirect('/dashboard');  // Adjust the redirect as needed for your app
    }
);

export default router;
