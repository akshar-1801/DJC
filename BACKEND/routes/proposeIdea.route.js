const express = require('express');
const multer = require('multer');
const { submitForm } = require('../controllers/proposeIdea.controller');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle form submission
router.post('/submit-form', upload.array('images', 5), submitForm);

module.exports = router;
