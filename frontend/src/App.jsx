import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BranchPage from './pages/BranchPage';
import SearchPage from './pages/SearchPage';
import YearPage from './pages/YearPage';
import CategoryPage from './pages/CategoryPage';
import AllNotesPage from './pages/AllNotesPage';
import AllPYQsPage from './pages/AllPYQsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Breadcrumb from './components/layout/Breadcrumb';
import { Helmet } from 'react-helmet-async';


function App() {
  <Helmet>
  <title>AKTU Buddy — Free Notes, PYQs and Quantum for AKTU Students</title>
  <meta name='description' content='Free study materials for AKTU students. Notes, Previous Year Papers and Quantum Booklets for CSE, IT, ECE and more.' />
</Helmet>
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Breadcrumb />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/branch/:branchCode" element={<BranchPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/branch/:branchCode/year/:year" element={<YearPage />} />
            <Route path="/branch/:branchCode/year/:year/:category" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notes" element={<AllNotesPage />} />
            <Route path="/pyqs" element={<AllPYQsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;