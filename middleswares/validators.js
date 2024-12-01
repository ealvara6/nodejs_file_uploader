const { check, validationResult } = require('express-validator');
const fs = require('fs');

const validateSignup = [
    check('firstName')
        .trim()
        .notEmpty()
        .withMessage('Please enter a first name.')
        .isAlpha()
        .withMessage('Name must only contain letters.')
        .toLowerCase(),
    check('lastName')
        .trim()
        .notEmpty()
        .withMessage('Please enter a last name.')
        .isAlpha()
        .withMessage('Name must only contain letters.')
        .toLowerCase(),
    check('email')
        .notEmpty()
        .withMessage('Please enter an email address.')
        .isEmail()
        .trim()
        .withMessage('Please Enter a valid email.'),
    check('password')
        .notEmpty()
        .withMessage('please enter a password.')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('Passwords do not match.')
]

const validateFile = [
    check('fileName')
    .notEmpty()
    .withMessage('Please enter a file name.'),
]

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    const customErrors = [];
    if (!req.file) {
        customErrors.push({ msg: 'No file selected.', param: 'file', location: 'body' });
    };
    
    const allErrors = [...errors.array(), ...customErrors];
    if (allErrors.length > 0) {
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('failed to delete invalid file: ', err);
            });
        }
        res.render(req.route.path.slice(1), { errors: allErrors });
    } else {
        next();
    }
 };

module.exports = {
    validateSignup,
    validateFile,
    handleValidationErrors
};
