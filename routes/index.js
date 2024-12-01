const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const uploadFileRoutes = require('./uploadFileRoutes');

router.use('/auth', authRoutes);
router.use('/file', uploadFileRoutes);

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;