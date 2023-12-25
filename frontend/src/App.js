import React from 'react';
import Ocr from './components/Ocr';
import OcrDataComponent from './components/OcrDataComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ocr/>} />
        <Route path="/ocrData" element={<OcrDataComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
