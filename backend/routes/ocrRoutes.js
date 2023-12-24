const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const performOCR = require('../controllers/ocrController');
const { saveToDatabase } = require('../database');

//Route for performing OCR on ID card Image
router.post('/api/ocr', upload.single('image'), performOCR);

router.post('/api/ocr/save',async (req,res) => {
    const data = req.body.data;
    try {
        const response = await saveToDatabase(data);
        res.json(response);
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Failed to save to Database'});
    }
});
module.exports = router;
