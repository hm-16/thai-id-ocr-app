
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeleteRecord = () => {
  const [idNumber, setIdNumber] = useState('');
  
  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

const handleDeleteRecord = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const idNumber = {identificationNumber : data.get('idNumber')};
    try {
        const response = await axios.delete('http://localhost:3001/api/ocr/delete',{params : idNumber});
        alert('Deleted the record');
    } catch (error) {
        console.error('Error Deleting record:', error);
        alert('Error Deleting record');
    }
    
}
  return (
    <div>
      <h2>Delete Record</h2>
      <form onSubmit={handleDeleteRecord}>
      <div>
        <label>Identification Number:</label>
        <input type="text" name = "idNumber" value={idNumber} onChange={handleIdNumberChange} />
        <button type="submit">Delete Record</button>
      </div>
      </form>

      <Link to="/">Go to OCR</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/update">Go to Update Records</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/fetch">Go to Fetch Records</Link>
    </div>
  );
};

export default DeleteRecord;
