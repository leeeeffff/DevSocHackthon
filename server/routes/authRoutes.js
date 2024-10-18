import express from 'express';
import { loginUser, signupUser, storePersonalInfo } from '../controllers/authController.js';
import passport from 'passport';

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
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        if (req.user && req.user.id) {
            // Redirect to FormPage with user ID after successful login
            const userId = req.user.id;
            res.redirect(`http://localhost:5173/FormPage?userId=${userId}`);
        } else {
            // Handle the error gracefully
            res.redirect('/login');
        }
    }
);

// GitHub OAuth route
router.get('/github', passport.authenticate('github', {
    scope: ['user:email']
}));

// GitHub OAuth callback route
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        if (req.user && req.user.id) {
            // Redirect to FormPage with user ID after successful login
            const userId = req.user.id;
            res.redirect(`http://localhost:5173/FormPage?userId=${userId}`);
        } else {
            // Handle the error gracefully
            res.redirect('/login');
        }
    }
);

// Personal information route
router.post('/users/:userId/personal-info', storePersonalInfo);

export default router;
