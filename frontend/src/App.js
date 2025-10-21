import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import InstitutionSearch from './pages/InstitutionSearch';
import StudentVerification from './pages/StudentVerification';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Grievance from './pages/Grievance';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/institutions" element={<InstitutionSearch />} />
          <Route path="/verify-student" element={<StudentVerification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grievance" element={<Grievance />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
