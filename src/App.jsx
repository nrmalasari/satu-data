import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MetadataPage from './pages/MetadataPage';

function App() {
  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/metadata" element={<MetadataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;