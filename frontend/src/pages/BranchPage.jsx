import { useParams, Link, useNavigate } from 'react-router-dom';

const branchNames = {
  CSE: 'Computer Science & Engineering',
  AI: 'CSE (AI/ML)',
  IT: 'Information Technology',
  ECE: 'Electronics & Communication',
  ME: 'Mechanical Engineering',
  CE: 'Civil Engineering',
};

const years = [
  { year: 1, sems: '1 & 2', label: 'First Year' },
  { year: 2, sems: '3 & 4', label: 'Second Year' },
  { year: 3, sems: '5 & 6', label: 'Third Year' },
  { year: 4, sems: '7 & 8', label: 'Final Year' },
];

const BranchPage = () => {
  const { branchCode } = useParams();
  const navigate = useNavigate();

  return (
    <div className='flex-1 bg-gray-50 py-8 md:py-12'>
      <div className='max-w-6xl mx-auto px-4'>

        <button onClick={() => navigate(-1)}
          className='mb-5 text-sm text-gray-500 hover:text-orange-500 transition flex items-center gap-1'>
          ← Back
        </button>

        <h1 className='text-2xl md:text-4xl font-bold text-center text-blue-900 mb-2'>
          {branchNames[branchCode] || branchCode}
        </h1>
        <p className='text-center text-gray-500 mb-8 md:mb-10 text-sm md:text-base'>
          Select Your Year
        </p>

        {/* 2 cols on all screens — works great on mobile too */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-3xl mx-auto'>
          {years.map(({ year, sems, label }) => (
            <Link
              key={year}
              to={`/branch/${branchCode}/year/${year}`}
              className='bg-white rounded-xl shadow-md hover:shadow-xl active:shadow-sm transition p-4 md:p-6 text-center border-2 border-gray-100 hover:border-orange-400'
            >
              <div className='text-3xl md:text-4xl font-bold text-orange-500 mb-1'>{year}</div>
              <div className='text-xs md:text-sm font-semibold text-gray-700'>{label}</div>
              <div className='text-xs text-gray-400 mt-1'>Sem {sems}</div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BranchPage;