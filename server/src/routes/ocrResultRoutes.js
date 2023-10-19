const express = require('express');
const router = express.Router();
const multer = require('multer');
const Tesseract = require('tesseract.js');
const ocrResultController = require('../controllers/ocrResultController');
const path = require('path'); // Add this import
const fs = require('fs');
const OcrResult = require('../model/ocrmodel');

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single('image'),ocrResultController.createOcrResult);
router.get('/images', ocrResultController.getAllOcrResults);


module.exports = router;
