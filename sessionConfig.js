const session = require('express-session');
const PrismaSessionStore = require('@quixo3/prisma-session-store').PrismaSessionStore;
const { PrismaClient } = require('@prisma/client');
require('dotenv').config()

module.exports = session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in ms
    },
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000, // 2 minutes in ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
});
