const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const performOCR = require('../controllers/ocrController');
const { saveToDatabase } = require('../database');
const IdCard = require('../models/IdCards');
//Route for performing OCR on ID card Image
router.post('/api/ocr', upload.single('image'), performOCR);

//Route for saving the OCR data to database
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

//Route for getting ID card data from database
router.get('/api/ocr', async (req, res) => {
    try {
      // Extracting filterparameters from query string
      const { idNumber, name, lastName, dob, doe, doi, dobOperator, doeOperator, doiOperator } = req.query;
  
      // Constructing filter object based on provided parameters
      const filter = {};
  
      if (idNumber) {
        filter['identificationNumber'] = idNumber;
      }
  
      if (name) {
        filter['name'] = name;
      }
  
      if (lastName) {
        filter['lastName'] = lastName;
      }
  
      if (dob && dobOperator) {
        filter['dateOfBirth'] = getDateFilter(dob, dobOperator);
      }
  
      if (doe && doeOperator) {
        filter['dateOfExpiry'] = getDateFilter(doe, doeOperator);
      }
  
      if (doi && doiOperator) {
        filter['dateOfIssue'] = getDateFilter(doi, doiOperator);
      }
  
      const ocrData = await IdCard.find(filter);
      res.json({ success: true, data: ocrData });
    } catch (err) {
      console.error('Failed to retrieve OCR data:', err);
      res.status(500).json({ success: false, message: 'Failed to retrieve OCR data' });
    }
  });
  
  // Helper function to construct date filters based on operator
  const getDateFilter = (date, operator) => {
    const dateFilter = {};
  
    if (operator === 'eq') {
      dateFilter['$eq'] = date;
    } else if (operator === 'gte') {
      dateFilter['$gte'] = date;
    } else if (operator === 'gt') {
      dateFilter['$gt'] = date;
    } else if (operator === 'lte') {
      dateFilter['$lte'] = date;
    } else if (operator === 'lt') {
      dateFilter['$lt'] = date;
    }
  
    return dateFilter;
  };

module.exports = router;
