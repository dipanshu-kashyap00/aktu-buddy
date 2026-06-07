import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BranchPage from './pages/BranchPage';
import SemesterPage from './pages/SemesterPage';
import SubjectPage from './pages/SubjectPage';
import SearchPage from './pages/SearchPage';
import YearPage from './pages/YearPage';
import CategoryPage from './pages/CategoryPage';
import AllNotesPage from './pages/AllNotesPage';
import AllPYQsPage from './pages/AllPYQsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DisclaimerPage from './pages/DisclaimerPage';
import ContactPage from './pages/ContactPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/branch/:branchCode" element={<BranchPage />} />
            <Route path="/branch/:branchCode/semester/:semesterNum" element={<SemesterPage />} />
            <Route path="/branch/:branchCode/semester/:semesterNum/subject/:subjectCode" element={<SubjectPage />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;