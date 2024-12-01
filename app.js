const express = require('express');
const bodyParser = require('body-parser');
const sessionConfig = require('./sessionConfig');
const passport = require('passport');
const initializePassport = require('./configurations/passportConfig.js');
const path = require('path');
require('dotenv').config();

const app = express();
const routes = require('./routes/index');

const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(express.static(path.join(__dirname, 'public')));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
