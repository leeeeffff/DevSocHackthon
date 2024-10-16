// load express app and routes

const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); //import db
const passport = require('passport');
const session = require('express-session');
require('dotenv').config(); // load env variables
require('./config/passportConfig'); // Import passport configuration

const app = express();
const PORT = process.env.PORT || 5000;

//mid
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from your frontend
    credentials: true  // This ensures that cookies (session info) are included in requests
  }));
app.use(express.json()); // parse json info
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// route
app.use('/api/auth', require('./routes/authRoutes')); // auth routes

// start server
app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});