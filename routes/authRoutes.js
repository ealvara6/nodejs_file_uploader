const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateSignup, handleValidationErrors } = require('../middleswares/validators');

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup',validateSignup, handleValidationErrors, authController.createuser)

router.get('/login', (req, res) => {
    res.render('log-in');
});

module.exports = router;