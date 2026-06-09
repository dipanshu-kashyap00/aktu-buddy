import { useParams, Link, useNavigate } from 'react-router-dom';

const yearLabels = {
  1: 'First Year', 2: 'Second Year', 3: 'Third Year', 4: 'Final Year'
};

const categories = [
  {
    id: 'notes', label: 'Notes', emoji: '📚',
    desc: 'Unit wise notes for all subjects',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400 active:bg-blue-100'
  },
  {
    id: 'pyq', label: 'Previous Year Papers', emoji: '📝',
    desc: 'Year wise PYQ for all subjects',
    color: 'bg-green-50 border-green-200 hover:border-green-400 active:bg-green-100'
  },
  {
    id: 'quantum', label: 'Quantum Booklets', emoji: '📖',
    desc: 'Quantum series for all subjects',
    color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400 active:bg-yellow-100'
  },
  {
    id: 'syllabus', label: 'Syllabus', emoji: '📋',
    desc: 'Official AKTU syllabus',
    color: 'bg-red-50 border-red-200 hover:border-red-400 active:bg-red-100'
  },
];

const YearPage = () => {
  const { branchCode, year } = useParams();
  const navigate = useNavigate();

  return (
    <div className='flex-1 bg-gray-50 py-8 md:py-12'>
      <div className='max-w-6xl mx-auto px-4'>

        <button onClick={() => navigate(-1)}
          className='mb-5 text-sm text-gray-500 hover:text-orange-500 transition flex items-center gap-1'>
          ← Back
        </button>

        <h1 className='text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1'>
          {yearLabels[parseInt(year)]}
        </h1>
        <p className='text-center text-gray-500 mb-8 md:mb-10 text-sm'>
          {branchCode} — Select a category
        </p>

        {/* 2x2 grid on mobile — full cards, easy to tap */}
        <div className='grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-6 max-w-2xl mx-auto'>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/branch/${branchCode}/year/${year}/${cat.id}`}
              className={`rounded-xl border-2 p-4 md:p-8 text-center transition shadow-sm hover:shadow-md ${cat.color}`}
            >
              <div className='text-3xl md:text-5xl mb-2 md:mb-3'>{cat.emoji}</div>
              <h2 className='text-sm md:text-lg font-bold text-gray-800 mb-0.5 md:mb-1 leading-tight'>
                {cat.label}
              </h2>
              <p className='text-xs text-gray-500 hidden sm:block'>{cat.desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default YearPage;