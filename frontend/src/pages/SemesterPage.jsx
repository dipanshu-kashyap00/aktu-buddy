import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SemesterPage = () => {
  const { branchCode, semesterNum } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        console.log('Fetching for branch:', branchCode, 'semester:', semesterNum);
        const response = await axios.get(`http://localhost:5001/api/subjects?branch=${branchCode}&semester=${semesterNum}`);
        console.log('Response data:', response.data);
        setSubjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setLoading(false);
      }
    };
    fetchSubjects();
  }, [branchCode, semesterNum]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading subjects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-secondary mb-2">
          Semester {semesterNum}
        </h1>
        <p className="text-center text-gray-600 mb-12">{branchCode} Branch</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject.code}
              to={`/branch/${branchCode}/semester/${semesterNum}/subject/${subject.code}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 border-l-4 border-primary"
            >
              <div className="text-sm text-primary font-medium mb-2">{subject.code}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{subject.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">Click to access materials →</span>
              </div>
            </Link>
          ))}
        </div>
        
        {subjects.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No subjects found for this semester.
          </div>
        )}
      </div>
    </div>
  );
};

export default SemesterPage;