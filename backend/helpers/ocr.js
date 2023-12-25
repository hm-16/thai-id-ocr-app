const { ImageAnnotatorClient } = require('@google-cloud/vision');
const sharp = require('sharp');
const extractInformation = require('./convertText');

// Google Cloud Vision API client
const vision = new ImageAnnotatorClient({
    keyFilename: 'thai-id-card-ocr-a0713ee030c0.json',
});

async function performOCR(file){

    try {
        let imageBuffer = file.buffer;

        //sharpening the image to make features more visible
        imageBuffer = await sharp(imageBuffer).sharpen(10).toBuffer();

        //OCR using google cloud vision API
        const [result] = await vision.textDetection(imageBuffer);
        const textAnnotations = result.textAnnotations;
        const extractedText = textAnnotations[0].description.trim();

        const jsonData = extractInformation(extractedText);
        return {status:"1",data:jsonData};
    } catch (error) {
        console.log(error);
        return {status:"0",data: error};
    }

}

module.exports = performOCR;
