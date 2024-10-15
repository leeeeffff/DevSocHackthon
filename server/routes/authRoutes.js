// define authetication routes

const express = require('express');
const { loginUser } = require('../controllers/authController'); // import controller

const router = express.Router();

// login route
router.post('/login', loginUser);

module.exports = router;