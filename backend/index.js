const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const performOCR = require('./helpers/ocr');

require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;
const upload = multer();

//route for image upload and ocr
app.post('/api/ocr',upload.single('image'), async(req,res)=>{

    //file is not uploaded
    if(!req.file){
        return res.status(400).json({success: false , error:'No image uploaded'});
    }

    //otherwise we will perform ocr on image
    const response = await performOCR(req.file);

    if(response.status==="1"){
        res.json(response.data);
    }else{
        res.status(500).json({success: false, error: 'OCR processing failed'});
    }
    
    
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });