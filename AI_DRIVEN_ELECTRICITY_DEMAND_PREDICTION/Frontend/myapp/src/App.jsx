import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import the Navbar Component
import Demandprediction from '@/components/Demandprediction';
import Purpose from './components/Purpose';
import Reports from './components/Reports';
import Models from './components/Models';


const App = () => {
  return (
    <Router>
      <Navbar /> {/* This will include the navigation bar */}
      <Routes>
        <Route path="/" element={<Navigate to="/prediction" />} /> 
        <Route path="/prediction" element={<Demandprediction />} />
        <Route path="/purpose" element={<Purpose />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/models" element={<Models />} />

      </Routes>
    </Router>
  );
};

export default App;
