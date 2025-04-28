import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import MetadataPage from './pages/MetadataPage';
import OrganisasiPage from './pages/OrganisasiPage';
import axios from 'axios';

// Buat wrapper untuk menangani scroll
const ScrollToTopWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <Router>
      <div className="main-container">
        <ScrollToTopWrapper> {/* Bungkus Routes dengan wrapper */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/metadata" element={<MetadataPage />} />
            <Route path="/organisasi" element={<OrganisasiPage />} />
          </Routes>
        </ScrollToTopWrapper>
      </div>
    </Router>
  );
}

export default App;