import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
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
      if(error.response.status===422 || error.response.status===500){
        alert('Invalid or Unclear Image');
      }
      console.error('OCR request failed:', error);
    }
  };

  const handelSave = async() => {
    try {
      
      const response = await axios.post('http://localhost:3001/api/ocr/save', {data : ocrResult});
      if(response.data.message===11000){
        alert('Id Card Already exists');
      }else if(response.data.message===121){
        alert('Some Fields Are Missing');
      }
      console.log(response);
    } catch (error) {
      console.error('Save request failed:', error);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and OCR</button>
      {ocrResult && (
        <div>
          <h3>OCR Result:</h3>
          <pre>{JSON.stringify({
              "identification_number" : ocrResult.identificationNumber,
              "name" : ocrResult.name,
              "last_name" : ocrResult.lastName,
              "date-of-birth" : ocrResult.dateOfBirth,
              "date-of-issue" : ocrResult.dateOfIssue,
              "date-of-expiry" : ocrResult.dateOfExpiry
            },null,2)}</pre>
          <button onClick={handelSave}>Save</button>
        </div>
      )}
      <br/>
      <Link to="/ocrData">Go to OCR Data </Link>
    </div>
  );
};

export default OcrComponent;
