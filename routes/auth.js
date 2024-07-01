const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const { promisify } = require('util');

// Define your routes here
router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/logout', (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 2 * 1000), // expire cookie after 2 seconds
        httpOnly: true,
        sameSite: 'none', // Set this if using HTTPS and cross-site requests
        secure: true // Set this if using HTTPS
    });

    res.redirect('/'); // Redirect to home or login page after logout
});
module.exports = router;
