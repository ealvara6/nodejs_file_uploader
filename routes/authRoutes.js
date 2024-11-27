const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const { validateSignup, handleValidationErrors } = require('../middleswares/validators');

router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup',validateSignup, handleValidationErrors, authController.createuser)

router.get('/login', (req, res) => {
    res.render('login');
});
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureMessage: true,
        failureFlash: false,
}));

router.get('/logout', (req, res) => {
    req.logOut(() => {
        res.redirect('/');
    });
});

module.exports = router;