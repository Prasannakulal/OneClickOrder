import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import ItemsPage from './components/ItemsPage';
import DeliveryItemsPage from './components/DeliveryItemsPage'; // Import your component
import LoginPage from './components/LoginPage'; // Ensure this component exists
import ResetPasswordPage from './components/ResetPasswordPage'; // Ensure this component exists

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/items" element={<ItemsPage />} />
        <Route path="/delivery-items" element={<DeliveryItemsPage />} /> {/* Add this route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<Navigate to="/login" replace />} /> {/* Default route */}
      </Routes>
    </Router>
  );
};

export default App;
