const mongoose = require('mongoose');

const ocrResultSchema = new mongoose.Schema({
  originalImage: {
    data: Buffer,
    contentType: String
  },
  extractedText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const OcrResult = mongoose.model('OcrResult', ocrResultSchema);

module.exports = OcrResult;
