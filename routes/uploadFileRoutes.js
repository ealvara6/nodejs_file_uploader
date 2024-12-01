const express = require('express');
const router = express.Router();
const multer = require('multer');
const { validateFile, handleValidationErrors } = require('../middleswares/validators');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });


router.get('/uploadFile', (req, res) => {
    res.render('uploadFile');
});

router.post('/uploadFile',upload.single('file'), validateFile, handleValidationErrors, (req, res) => {
    res.render('index', {
        msg: 'File uploaded successfully'
    });
});

module.exports = router;
