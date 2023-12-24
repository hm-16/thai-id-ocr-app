const performOCR = require('../helpers/ocr');
const ocrController = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, error: 'No image uploaded' });
    }

    const response = await performOCR(req.file);

    if (response.status === '1') {
        const missingFields = [];

        if (!response.data.identificationNumber) {
            missingFields.push("identificationNumber");
        }
        if (!response.data.name) {
            missingFields.push("Name");
        }
        if (!response.data.lastName) {
            missingFields.push("Last Name");
        }
        if (!response.data.dateOfBirth) {
            missingFields.push("Date of Birth");
        }
        if (!response.data.dateOfIssue) {
            missingFields.push("Date of Issue");
        }
        if (!response.data.dateOfExpiry) {
            missingFields.push("Date of Expiry");
        }

        if (missingFields.length > 0) {
            const errorMessage = `Missing fields: ${missingFields.join(', ')}`;
            return res.status(422).json({ success: false, error: errorMessage });
        }
        
        res.json(response.data);
    } else {
        res.status(500).json({ success: false, error: response.data });
    }
};

module.exports = ocrController;
