import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { oauthLogin } from '../controllers/authController.js';

// Serialize the user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize the user
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        await oauthLogin(profile, done, 'google');
    } catch (error) {
        done(error);
    }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/api/auth/github/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        profile._json.access_token = accessToken;  // Pass the access token for later use
        await oauthLogin(profile, done, 'github');
    } catch (error) {
        done(error);
    }
}));

export default passport;
