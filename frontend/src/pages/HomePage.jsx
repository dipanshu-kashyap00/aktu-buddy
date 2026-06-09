import { Link } from 'react-router-dom';

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering', emoji: '💻', status: 'live' },
  { code: 'AI', name: 'CSE (AI/ML)', emoji: '🤖', status: 'live' },
  { code: 'IT', name: 'Information Technology', emoji: '🖥️', status: 'live' },
  { code: 'ECE', name: 'Electronics & Communication', emoji: '📡', status: 'live' },
  { code: 'ME', name: 'Mechanical Engineering', emoji: '⚙️', status: 'live' },
  { code: 'CE', name: 'Civil Engineering', emoji: '🏗️', status: 'live' },
];

const stats = [
  { value: '32+', label: 'Subjects' },
  { value: '8', label: 'Semesters' },
  { value: '3', label: 'Resources' },
  { value: '100%', label: 'Free' },
];

const steps = [
  { step: '1', title: 'Pick your branch', desc: 'Select from CSE, IT, ECE and more' },
  { step: '2', title: 'Choose your year', desc: 'First to Final year — all covered' },
  { step: '3', title: 'Download & study', desc: 'Notes, PYQs and Quantum — free' },
];

const HomePage = () => (
  <div className='min-h-screen bg-gray-50'>

    {/* Hero — reduced padding on mobile */}
    <div className='bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white py-12 md:py-20'>
      <div className='max-w-6xl mx-auto px-4 text-center'>
        <div className='text-4xl md:text-5xl mb-3'>🎓</div>
        <h1 className='text-3xl md:text-6xl font-bold mb-3'>AKTU Buddy</h1>
        <p className='text-lg md:text-2xl opacity-90 mb-2'>Your friendly guide to AKTU success</p>
        <p className='text-sm md:text-base opacity-75 mb-8 px-2'>
          Notes • Quantum Booklets • Previous Year Papers — all in one place
        </p>
        <a href='#branches'
          className='inline-block bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-6 md:px-8 py-3 rounded-full transition shadow-lg text-sm md:text-base'>
          Find Your Branch →
        </a>
      </div>
    </div>

    {/* Stats — 2x2 on mobile, 4 cols on desktop */}
    <div className='bg-white border-b'>
      <div className='max-w-6xl mx-auto px-4 py-5 md:py-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-center'>
          {stats.map((s) => (
            <div key={s.label} className='py-2'>
              <div className='text-2xl md:text-3xl font-bold text-orange-500'>{s.value}</div>
              <div className='text-xs md:text-sm text-gray-500 mt-1'>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* How it works */}
    <div className='max-w-6xl mx-auto px-4 py-10 md:py-12'>
      <h2 className='text-xl md:text-2xl font-bold text-center text-blue-900 mb-6 md:mb-8'>How it works</h2>
      {/* Horizontal scroll on very small screens, grid on md+ */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto'>
        {steps.map((item) => (
          <div key={item.step} className='flex md:flex-col items-center md:text-center gap-4 md:gap-0 p-4 md:p-6 bg-white rounded-xl shadow-sm'>
            <div className='w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 md:mx-auto md:mb-3'>
              {item.step}
            </div>
            <div>
              <h3 className='font-semibold text-gray-800 mb-0.5 md:mb-1'>{item.title}</h3>
              <p className='text-sm text-gray-500'>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Branches */}
    <div id='branches' className='max-w-6xl mx-auto px-4 pb-12 md:pb-16'>
      <h2 className='text-xl md:text-2xl font-bold text-center text-blue-900 mb-6 md:mb-8'>
        Select Your Branch
      </h2>
      {/* 1 col on small mobile, 2 cols on sm+, 3 cols on lg+ */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 max-w-4xl mx-auto'>
        {branches.map((branch) => (
          <Link
            key={branch.code}
            to={branch.status === 'live' ? `/branch/${branch.code}` : '#'}
            className={`bg-white rounded-xl shadow-sm hover:shadow-md active:shadow-sm transition p-4 md:p-6 flex items-center gap-3 md:gap-4 border border-gray-100 hover:border-orange-300 ${
              branch.status !== 'live' ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <div className='text-3xl md:text-4xl flex-shrink-0'>{branch.emoji}</div>
            <div className='min-w-0'>
              <h3 className='font-semibold text-gray-800 text-sm md:text-base leading-tight'>{branch.name}</h3>
              <p className='text-xs mt-1 text-gray-400'>
                {branch.status === 'live' ? '✓ Available now' : '🔜 Coming soon'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  </div>
);

export default HomePage;