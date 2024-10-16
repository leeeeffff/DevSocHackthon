import express from 'express';
import passport from 'passport'; // Import passport for OAuth handling
import { loginUser } from '../controllers/authController.js'; // Use ES module import and add .js extension

const router = express.Router();

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

export default router;
