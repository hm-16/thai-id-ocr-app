import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const OcrComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrResult, setOcrResult] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size / 1024 / 1024; // Size in MB
      const maxSize = 2; // Maximum size in MB

      if (fileSize > maxSize) {
        alert('Please choose an image file smaller than 2 MB.');
        event.target.value = ''; 
      } else {
        
        setSelectedFile(event.target.files[0]);
      }
    }
    
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
      alert('Id Card Saved');
    } catch (error) {
      console.error('Save request failed:', error);
      alert('Saving Id Card Failed');
    }
  }

  return (
    <div>
    <h2>Upload ID Card</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload and OCR</button>
      {ocrResult && (
        <div>
          <h2>OCR Result:</h2>
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
      <Link to="/update">Go to Update Records</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/fetch">Go to Fetch Records</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/delete">Go to Delete Records</Link>
    </div>
  );
};

export default OcrComponent;
