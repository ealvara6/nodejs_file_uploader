const { check, validationResult } = require('express-validator');

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

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render(req.route.path.slice(1), { errors: errors.array() });
    } else {
        next();
    }
 };

module.exports = {
    validateSignup,
    handleValidationErrors
};
