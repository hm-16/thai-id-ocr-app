const { ImageAnnotatorClient } = require('@google-cloud/vision');
const sharp = require('sharp');
const extractInformation = require('./convertText');

// Google Cloud Vision API client
const vision = new ImageAnnotatorClient({
    keyFilename: {
            "type": process.env.type,
            "project_id": process.env.project_id,
            "private_key_id": process.env.private_key_id,
            "private_key": process.env.private_key,
            "client_email": process.env.client_email,
            "client_id": process.env.client_id,
            "auth_uri": process.env.auth_uri,
            "token_uri": process.env.token_uri,
            "auth_provider_x509_cert_url": process.env.auth_provider_x509_cert_url,
            "client_x509_cert_url": process.env.client_x509_cert_url,
            "universe_domain": process.env.universe_domain
    },
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
