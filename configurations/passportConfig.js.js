const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { findUser, findUserById} = require('../services/authService');


const initializePassport = (passport) => {
    passport.use(
        new LocalStrategy(async (username, password, done) => {
            const user = await findUser(username);
            if (!user) {
                return done(null, false, { message: 'Incorrect Email'});
            }

            try {
                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Incorrect password' });
                }
            } catch (err) {
                return done(err);
            }
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id);
        done(null, user || false);
    });
};

module.exports = initializePassport;