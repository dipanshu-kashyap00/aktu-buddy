import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubjectsBySemester } from '../services/subjectAPI';

const YearPage = () => {
  const { branchCode, year } = useParams();
  const yearNum = parseInt(year);
  const sem1 = yearNum * 2 - 1;
  const sem2 = yearNum * 2;

  const [subjects1, setSubjects1] = useState([]);
  const [subjects2, setSubjects2] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [r1, r2] = await Promise.all([
          getSubjectsBySemester(branchCode, sem1),
          getSubjectsBySemester(branchCode, sem2),
        ]);
        setSubjects1(r1.data);
        setSubjects2(r2.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [branchCode, year]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading subjects...</div>
    </div>
  );

  const SubjectGrid = ({ subjects, semNum }) => (
    <div>
      <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b">
        Semester {semNum}
      </h2>
      <div className="grid grid-cols-1 gap-3">
        {subjects.length === 0 ? (
          <p className="text-gray-400 text-sm py-4">No subjects found</p>
        ) : subjects.map((subject) => (
          <Link
            key={subject.code}
            to={`/branch/${branchCode}/semester/${semNum}/subject/${subject.code}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 border-l-4 border-orange-400 hover:border-orange-500"
          >
            <div className="text-xs text-orange-500 font-medium mb-1">{subject.code}</div>
            <div className="text-sm font-semibold text-gray-800">{subject.name}</div>
            <div className="text-xs text-gray-400 mt-1">Notes • PYQ • Quantum →</div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-1">
          Year {year}
        </h1>
        <p className="text-center text-gray-500 mb-10">{branchCode} — Semester {sem1} & {sem2}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SubjectGrid subjects={subjects1} semNum={sem1} />
          <SubjectGrid subjects={subjects2} semNum={sem2} />
        </div>
      </div>
    </div>
  );
};

export default YearPage;