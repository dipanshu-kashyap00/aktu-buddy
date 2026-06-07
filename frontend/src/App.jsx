import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import BranchPage from './pages/BranchPage';
import SemesterPage from './pages/SemesterPage';
import SubjectPage from './pages/SubjectPage';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;