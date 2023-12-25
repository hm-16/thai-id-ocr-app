
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UpdateRecord = () => {
  const [idNumber, setIdNumber] = useState('');
  const [record, setRecord] = useState(null);
  
  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleFindRecord = async (event) => {
    event.preventDefault();
    const reqData = new FormData(event.target);
    
    try {
      const response = await axios.get('http://localhost:3001/api/ocr',{params : {idNumber : reqData.get('idNumber')}});
      console.log(response);
      if (response.data.data.length === 1) {
        console.log(response.data.data[0]);
        setRecord(response.data.data[0]);
      } else {
        alert('Record not found');
      }
    } catch (error) {
      console.error('Error fetching record:', error);
      alert('Error fetching record');
    }
  };

  const handleDetailChange = (event) => {
    const { name, value } = event.target;
    setRecord((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handelUpdate = async (event) =>{
    event.preventDefault();
    const currDetails = new FormData(event.target);
    const filter = {
        identificationNumber: idNumber,
        name : currDetails.get('name'),
        lastName : currDetails.get('lastName'),
        dateOfBirth : currDetails.get('dateOfBirth'),
        dateOfIssue : currDetails.get('dateOfIssue'),
        dateOfExpiry : currDetails.get('dateOfExpiry')
    };
    try {
        const response = await axios.get('http://localhost:3001/api/ocr/update',{params : filter});
        console.log(response);
        
      } catch (error) {
        console.error('Error Updating record:', error);
        alert('Error Updating record');
      }    
  }

  return (
    <div>
      <h2>Update Record</h2>
      <form onSubmit={handleFindRecord}>
      <div>
        <label>Identification Number:</label>
        <input type="text" name = "idNumber" value={idNumber} onChange={handleIdNumberChange} />
        <button type="submit">Find Record</button>
      </div>
      </form>
      {record && (
        <div>
          {/* Display the found record details */}
          <h3>Record Details:</h3>
          <form onSubmit={handelUpdate}>
          
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={record.name} onChange={handleDetailChange}/>
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={record.lastName} onChange={handleDetailChange}/>
      </div>

      <div>
        <label>Date of Birth:</label>
        <input type="text" name="dateOfBirth" value={record.dateOfBirth} onChange={handleDetailChange}/>
      </div>

      <div>
        <label>Date of Issue:</label>
        <input type="text" name="dateOfIssue" value={record.dateOfIssue} onChange={handleDetailChange}/>
      </div>

      <div>
        <label>Date of Expiry:</label>
        <input type="text" name="dateOfExpiry" value={record.dateOfExpiry} onChange={handleDetailChange}/>
      </div>
          <button type = "submit">Update Record</button>
          </form>
          
        </div>
      )}

      <Link to="/">Go to OCR</Link>
    </div>
  );
};

export default UpdateRecord;
