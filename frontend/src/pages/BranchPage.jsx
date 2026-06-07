import { useParams, Link } from 'react-router-dom';

const BranchPage = () => {
  const { branchCode } = useParams();

  const branchNames = {
    CSE: 'Computer Science & Engineering',
    AI: 'CSE (AI/ML)',
    IT: 'Information Technology',
    ECE: 'Electronics & Communication'
  };

  const years = [
    { year: 1, sems: '1 & 2', label: 'First Year' },
    { year: 2, sems: '3 & 4', label: 'Second Year' },
    { year: 3, sems: '5 & 6', label: 'Third Year' },
    { year: 4, sems: '7 & 8', label: 'Final Year' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-2">
          {branchNames[branchCode] || branchCode}
        </h1>
        <p className="text-center text-gray-500 mb-12">Select Your Year</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {years.map(({ year, sems, label }) => (
            <Link
              key={year}
              to={`/branch/${branchCode}/year/${year}`}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-center border-2 border-gray-100 hover:border-orange-400"
            >
              <div className="text-4xl font-bold text-orange-500 mb-1">{year}</div>
              <div className="text-sm font-semibold text-gray-700">{label}</div>
              <div className="text-xs text-gray-400 mt-1">Sem {sems}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchPage;