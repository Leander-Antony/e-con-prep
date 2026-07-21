import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PuzzleIDE from './pages/PuzzleIDE';
import CodingIDE from './pages/CodingIDE';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/logic" element={<PuzzleIDE />} />
        <Route path="/coding" element={<CodingIDE />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
