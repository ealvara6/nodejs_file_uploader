const bcrypt = require('bcrypt');
const userService = require('../services/authService');

const saltRounds = 10;

exports.createuser = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;

        const existingUser = await userService.findUser(email);
        console.log(existingUser);

        if (existingUser) {
            return res.render('signup', { errors: [{ msg: 'Email is already tied to an existing user.' }]});
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log('Hashed password:', hashedPassword);

        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        };

        const user = await userService.createUser(data);
        console.log('user succefully created:', user);
        res.redirect('/');
    } catch (e) {
        res.status(500).json({ error: `Failed to create user: ${e}`});
    }
};
