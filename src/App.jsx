import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import MetadataPage from './pages/MetadataPage';
import OrganisasiPage from './pages/OrganisasiPage';
import axios from 'axios';
import InfografisPage from './pages/InfografisPage';
import DetailPage from './pages/DetailPage';
import OrganisasiDetailPage from './pages/OrganisasiDetailPage';
import InfografisDetailPage from './pages/InfografisDetailPage';

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
            <Route path="/organisasiDetails/:id" element={<OrganisasiDetailPage />} />
            <Route path="/infografis" element={<InfografisPage />} />
            <Route path="/datasets/:id" element={<DetailPage />} />
            <Route path="/infografis/:id" element={<InfografisDetailPage />} />
          </Routes>
        </ScrollToTopWrapper>
      </div>
    </Router>
  );
}

export default App;