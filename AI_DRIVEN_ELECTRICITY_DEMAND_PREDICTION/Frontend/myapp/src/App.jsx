import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Demandprediction from '@/components/Demandprediction';
import Purpose from './components/Purpose';
import Reports from './components/Reports';
import Models from './components/Models';
import Login from './components/Login';

const App = () => {
  const location = useLocation();  
  const hideNavbarRoutes = ['/']; // Add more routes if needed

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />} {/* Hide Navbar for login page */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authenticated" element={<Navigate to="/prediction" />} /> 
        <Route path="/prediction" element={<Demandprediction />} />
        <Route path="/purpose" element={<Purpose />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/models" element={<Models />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
