// define authetication routes

const express = require('express');
const { signupUser } = require('../controllers/authController'); // import controller

const router = express.Router();

// POST request to handle user sign-up
router.post('/signup', signupUser);

module.exports = router;