import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchRecords = () => {
  const [filters, setFilters] = useState({
    idNumber: '',
    name: '',
    lastName: '',
    dob: '',
    doi: '',
    doe: '',
    dobOperator: '',
    doiOperator: '',
    doeOperator: '',
  });

  const [ocrData, setOcrData] = useState([]);
  const [applyFiltersClicked, setApplyFiltersClicked] = useState(false);

  useEffect(() => {
    // Fetch data only when the "Apply Filters" button is clicked
    if (applyFiltersClicked) {
      fetchData();
      // Reset the applyFiltersClicked state after fetching data
      setApplyFiltersClicked(false);
    }
  }, [filters, applyFiltersClicked]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/ocr', {
        params: filters,
      });
      if(response.data.data.length ===0 ){
        alert('No Records present');
      }
      setOcrData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error fetching ata');
    }
  };

  const handleFetch = (event) => {
    // Set the applyFiltersClicked state to true when the button is clicked
    event.preventDefault();
    const formData = new FormData(event.target);

    fetchData({
      idNumber: formData.get('idNumber'),
      name : formData.get('name'),
      lastName : formData.get('lastName'),
      dob : formData.get('dob'),
      doi : formData.get('doi'),
      doe : formData.get('doe'),
      dobOperator : formData.get('dobOperator'),
      doiOperator : formData.get('doiOperator'),
      doeOperator : formData.get('doeOperator')
    })
    setApplyFiltersClicked(true);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div>
      <h2>OCR Data</h2>

      <form onSubmit={handleFetch}>
      <div>
        <label>ID Number:</label>
        <input type="text" name="idNumber" value={filters.idNumber} onChange={handleFilterChange} />
      </div>

      <div>
        <label>Name:</label>
        <input type="text" name="name" value={filters.name} onChange={handleFilterChange}/>
      </div>

      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={filters.lastName} onChange={handleFilterChange}/>
      </div>

      <div>
        <label>Date of Birth:</label>
        <input type="text" name="dob" value={filters.dob} onChange={handleFilterChange}/>
        <select name="dobOperator" value={filters.dobOperator} onChange={handleFilterChange}>
          <option value="">Select Operator</option>
          <option value="eq">Equals</option>
          <option value="gte">Greater than or equal to</option>
          <option value="gt">Greater than</option>
          <option value="lte">Less than or equal to</option>
          <option value="lt">Less than</option>
        </select>
      </div>

      <div>
        <label>Date of Issue:</label>
        <input type="text" name="doi" value={filters.doi} onChange={handleFilterChange}/>
        <select name="doiOperator" value={filters.doiOperator} onChange={handleFilterChange}>
          <option value="">Select Operator</option>
          <option value="eq">Equals</option>
          <option value="gte">Greater than or equal to</option>
          <option value="gt">Greater than</option>
          <option value="lte">Less than or equal to</option>
          <option value="lt">Less than</option>
        </select>
      </div>

      <div>
        <label>Date of Expiry:</label>
        <input type="text" name="doe" value={filters.doe} onChange={handleFilterChange}/>
        <select name="doeOperator" value={filters.doeOperator} onChange={handleFilterChange}>
          <option value="">Select Operator</option>
          <option value="eq">Equals</option>
          <option value="gte">Greater than or equal to</option>
          <option value="gt">Greater than</option>
          <option value="lte">Less than or equal to</option>
          <option value="lt">Less than</option>
        </select>
      </div>

      <button type = "submit">Fetch</button>
      </form>
      <ul>
        {ocrData.map((data) => (
          <li key={data._id}>
            {/* Render the data */}
            <pre>{JSON.stringify({
              "identification_number" : data.identificationNumber,
              "name" : data.name,
              "last_name" : data.lastName,
              "date-of-birth" : data.dateOfBirth,
              "date-of-issue" : data.dateOfIssue,
              "date-of-expiry" : data.dateOfExpiry
            },null,2)}</pre>
          </li>
        ))}
      </ul>

      <Link to="/">Go to OCR </Link>&nbsp;&nbsp;&nbsp;
      <Link to="/update">Go to Update Records</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/delete">Go to Delete Records</Link>
    </div>
  );
};

export default FetchRecords;
