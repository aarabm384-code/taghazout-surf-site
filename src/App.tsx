import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { TaxiPage } from './pages/TaxiPage';
import { SurfPage } from './pages/SurfPage';
import { TripsPage } from './pages/TripsPage';
import { AdminPage } from './pages/AdminPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">   {/* غيرت bg-white إلى bg-gray-50 لتحسين المظهر */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/taxi" element={<TaxiPage />} />
          <Route path="/surf" element={<SurfPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;