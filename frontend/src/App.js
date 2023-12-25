import React from 'react';
import Ocr from './components/Ocr';
import FetchRecords from './components/FetchRecords';
import UpdateRecords from './components/UpdateRecords';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteRecord from './components/DeleteRecords';

function App() {
  return (
    <>
    <h1>Thai ID OCR App</h1>
    <h2>About</h2>
    <p>It is an OCR (Optical Character Recognition) App that can recognize thai id cards 
    and get the required information. Also, It saves this information for retrival later.</p>
    <Router>
      <Routes>
        <Route path="/" element={<Ocr/>} />
        <Route path="/fetch" element={<FetchRecords />} />
        <Route path="/update" element={<UpdateRecords />} />
        <Route path="/delete" element={<DeleteRecord />}/>
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
