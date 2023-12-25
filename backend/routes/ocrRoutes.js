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

  //Route to update details
  router.get('/api/ocr/update',async (req,res) => {
    try {
      const details = req.query;
      
      // Use findOneAndUpdate to find and update the record
    const updateResult = await IdCard.updateOne(
      { identificationNumber: details.identificationNumber },
      { $set: details },
      {new : true}
    );
     // Check if any document matched the filter
     if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.json({ success: true, message: 'Record updated successfully' });
  } catch (error) {
    console.error('Error updating record:', error);
    res.status(500).json({ success: false, message: 'Failed to update record' });
  }
  });


//Route to delete record
router.delete('/api/ocr/delete', async (req, res) => {
  try {
    const idNumber = req.query;

    // Use findOneAndDelete to find and delete the record in a single operation
    const deletedRecord = await IdCard.findOneAndDelete({ identificationNumber: idNumber });

    if (!deletedRecord) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    return res.json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete record' });
  }
});

module.exports = router;
