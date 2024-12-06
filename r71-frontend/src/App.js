import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import Summary from './Summary';
import Reports from './Reports';
import Layouts from './Layouts';


const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the stored token
    setToken(null); // Update the state to reflect the logout
    window.location.href = '/'; // Redirect to the login page
};

    return (
      <Router>
      <Routes>
          {/* Public Route for Login */}
          <Route
              path="/"
              element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/dashboard" />}
          />

          {/* Protected Routes Wrapped in Layout */}
          <Route element={<Layouts token={token} handleLogout={handleLogout} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/reports" element={<Reports />} />
          </Route>
      </Routes>
  </Router>
    );
};

export default App;
