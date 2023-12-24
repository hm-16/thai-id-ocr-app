import React, { useState } from 'react';
import axios from 'axios';

const OcrComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3001/api/ocr', formData);
      console.log(response.data);
      setOcrResult(response.data);
    } catch (error) {
      console.error('OCR request failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and OCR</button>
      {ocrResult && (
        <div>
          <h3>OCR Result:</h3>
          <pre>{JSON.stringify(ocrResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default OcrComponent;
