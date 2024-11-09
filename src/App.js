import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  // Replace this with your actual Google Client ID
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '592350947296-nphs1sra7urfs6tfrjr4cie2qlkr5o34.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;