import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { TaxiPage } from './pages/TaxiPage';
import { SurfPage } from './pages/SurfPage';
import { TripsPage } from './pages/TripsPage';
import { AdminPage } from './pages/AdminPage';

// هاد الـ Component هو "العساس" اللي كيرجعك لفوق فاش كتمشي لصفحة جديدة
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // كيرجع السكرول لـ 0 فـ كاع التليفونات والحواسيب
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* ضروري هاد السطر يكون هنا وسط Router وفوق Navbar */}
      <ScrollToTop />
      
      <div className="min-h-screen bg-gray-50">
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