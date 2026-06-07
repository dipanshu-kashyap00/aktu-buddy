import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SubjectPage = () => {
  const { branchCode, semesterNum, subjectCode } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/subjects/${subjectCode}`);
        setSubject(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subject:', error);
        setLoading(false);
      }
    };
    fetchSubject();
  }, [subjectCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading subject details...</div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Subject not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-2">{subject.name}</h1>
          <p className="text-gray-600">Subject Code: {subject.code}</p>
          <p className="text-gray-600">Branch: {subject.branch} | Semester: {subject.semester}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">📚 Notes</h2>
            {subject.notes && subject.notes.length > 0 ? (
              <ul className="space-y-3">
                {subject.notes.map((note, index) => (
                  <li key={index}>
                    <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">
                      <div className="font-medium">{note.title}</div>
                      <div className="text-sm text-gray-500">{note.fileSize}</div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">Notes coming soon</p>
            )}
          </div>

          {/* Column 2: Quantum (Yellow background) */}
          <div className="bg-yellow-50 rounded-lg shadow-md p-6 border-2 border-yellow-200">
            <h2 className="text-xl font-bold text-secondary mb-4 border-b pb-2">📖 Quantum Booklets</h2>
            {subject.quantum && subject.quantum.length > 0 ? (
              <ul className="space-y-3">
                {subject.quantum.map((q, index) => (
                  <li key={index}>
                    <a href={q.pdfUrl} target="_blank" rel="noopener noreferrer" className="block p-3 bg-white rounded hover:bg-gray-50">
                      <div className="font-medium">{q.title}</div>
                      <div className="text-sm text-gray-500">{q.fileSize}</div>
                      {q.isPopular && <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Popular</span>}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">Quantum coming soon</p>
            )}
          </div>

          {/* Column 3: PYQs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary mb-4 border-b pb-2">📝 Previous Year Papers</h2>
            {subject.pyqs && subject.pyqs.length > 0 ? (
              <ul className="space-y-3">
                {subject.pyqs.map((pyq, index) => (
                  <li key={index}>
                    <a href={pyq.pdfUrl} target="_blank" rel="noopener noreferrer" className="block p-3 bg-gray-50 rounded hover:bg-gray-100">
                      <div className="font-medium">{pyq.year} - {pyq.session}</div>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">Previous Year Papers coming soon</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;