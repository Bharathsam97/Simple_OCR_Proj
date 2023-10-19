const OcrResult = require('../model/ocrmodel'); // Import the model
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path'); // Add this import
const fs = require('fs');

// Create a new OCR result
const createOcrResult = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Check if the uploaded file is an image (add more validation as needed)
    if (['image/png', 'image/jpeg'].indexOf(req.file.mimetype) === -1) {
      return res.status(400).json({ error: 'Invalid file format' });
    }

    const imageBuffer = req.file.buffer;
    const { data } = await Tesseract.recognize(imageBuffer);

    const imageBase64 = Buffer.from(imageBuffer).toString('base64');
    const imageMimeType = req.file.mimetype;
    const originalImageURL = `data:${imageMimeType};base64,${imageBase64}`;

    // Create a new instance of the OCRResult model and save it to the database
    const ocrResult = new OcrResult({
      originalImage: originalImageURL, // Store the image URL
      extractedText: data.text, // Store the extracted text
    });

    const savedResult = await ocrResult.save();

    res.json({ text: data.text, _id: savedResult._id, originalImage: originalImageURL });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

// Retrieve all OCR results
const getAllOcrResults = async (req, res) => {
  try {
    const results = await OcrResult.find({}).limit(30);
    res.json(results); // Send the results as JSON response
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' }); // Handle errors and send an error response
  }
}

module.exports = {
  createOcrResult,
  getAllOcrResults,
};
