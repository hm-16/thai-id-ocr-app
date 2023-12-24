const mongoose = require('mongoose');


const idCardSchema = new mongoose.Schema({
    identificationNumber: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String, 
      required: true,
    },
    lastName: {
        type: String, 
        required: true,
    },
    dateOfBirth: {
        type: String, 
        required: true,
    },
    dateOfIssue: {
        type: String, 
        required: true,
    },
    dateOfExpiry: {
        type: String, 
        required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['success', 'failure'],
      required: true,
    },
    error: {
      type: String,
    },
  });
  

const IdCard = mongoose.model('idcard', idCardSchema);
  
module.exports = IdCard