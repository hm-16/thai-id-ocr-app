import React from 'react';
import Ocr from './components/Ocr';
import FetchRecords from './components/FetchRecords';
import UpdateRecords from './components/UpdateRecords';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DeleteRecord from './components/DeleteRecords';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ocr/>} />
        <Route path="/fetch" element={<FetchRecords />} />
        <Route path="/update" element={<UpdateRecords />} />
        <Route path="/delete" element={<DeleteRecord />}/>
      </Routes>
    </Router>
  );
}

export default App;
