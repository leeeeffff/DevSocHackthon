// load express app and routes

const express = require('express');
const cors = require('cors');
const pool = require('./config/db'); //import db
require('dotenv').config(); // load env variables


const app = express();
const PORT = process.env.PORT || 5000;

//mid
app.use(cors());
app.use(express.json()); // parse json info

// route
app.use('/api/auth', require('./routes/authRoutes')); // auth routes

// start server
app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});