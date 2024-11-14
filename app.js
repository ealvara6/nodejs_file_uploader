const express = require('express');
const bodyParser = require('body-parser');
const sessionConfig = require('./sessionConfig');
const path = require('path');
require('dotenv').config();

const app = express();
const routes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
