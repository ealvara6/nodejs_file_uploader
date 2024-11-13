const express = require('express');
const bodyParser = require('body-parser');
const sessionConfig = require('./sessionConfig');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
