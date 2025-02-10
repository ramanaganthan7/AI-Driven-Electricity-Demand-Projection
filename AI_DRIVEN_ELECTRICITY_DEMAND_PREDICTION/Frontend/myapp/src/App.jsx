/*import { useState } from 'react'
import './App.css'
import Demandprediction from '@/components/Demandprediction'
import Navbar from './components/navbar'
function App() {

  return (
    <div>
      <Demandprediction />
      <Navbar></Navbar>
      
      </div>
  )
}

export default App
*/
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';  // Import the Navbar Component
import Demandprediction from '@/components/Demandprediction'
import Purpose from './components/Purpose';

const App = () => {
  return (
    <Router>
      <Navbar /> {/* This will include the navigation bar */}
      <Routes>
        <Route path="/prediction" element={<Demandprediction />} />
        <Route path="/purpose" element={<Purpose />} />

      </Routes>
    </Router>
  );
};

export default App;
