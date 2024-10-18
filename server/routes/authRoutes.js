// Define authentication routes
import express from 'express';  // Use import for express
import { loginUser, signupUser, storePersonalInfo } from '../controllers/authController.js';  // Import controller (include .js extension)
import passport from 'passport';  // Import passport for OAuth handling

const router = express.Router();

// Sign up route
router.post('/signup', signupUser);

// Login route
router.post('/login', loginUser);

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

// Personal information route
router.post('/users/:userId/personal-info', storePersonalInfo);

export default router;
