import { Link } from 'react-router-dom';

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering', emoji: '💻', status: 'live' },
  { code: 'AI', name: 'CSE (AI/ML)', emoji: '🤖', status: 'live' },
  { code: 'IT', name: 'Information Technology', emoji: '🖥️', status: 'coming-soon' },
  { code: 'ECE', name: 'Electronics & Communication', emoji: '📡', status: 'coming-soon' },
  { code: 'ME', name: 'Mechanical Engineering', emoji: '⚙️', status: 'coming-soon' },
  { code: 'CE', name: 'Civil Engineering', emoji: '🏗️', status: 'coming-soon' },
];

const stats = [
  { value: '32+', label: 'Subjects' },
  { value: '8', label: 'Semesters' },
  { value: '3', label: 'Resources per Subject' },
  { value: '100%', label: 'Free' },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">AKTU Buddy</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-2">Your friendly guide to AKTU success</p>
          <p className="text-base opacity-75 mb-10">Notes • Quantum Booklets • Previous Year Papers — all in one place</p>
          <a href="#branches"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition shadow-lg">
            Find Your Branch →
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-orange-500">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { step: '1', title: 'Pick your branch', desc: 'Select from CSE, IT, ECE and more' },
            { step: '2', title: 'Choose your year', desc: 'First to Final year — all covered' },
            { step: '3', title: 'Download & study', desc: 'Notes, PYQs and Quantum — free' },
          ].map((item) => (
            <div key={item.step} className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Branches */}
      <div id="branches" className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Select Your Branch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {branches.map((branch) => (
            <Link
              key={branch.code}
              to={branch.status === 'live' ? `/branch/${branch.code}` : '#'}
              className={`bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex items-center gap-4 border border-gray-100 hover:border-orange-300 ${
                branch.status === 'coming-soon' ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <div className="text-4xl">{branch.emoji}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{branch.name}</h3>
                <p className="text-xs mt-1 text-gray-400">
                  {branch.status === 'live' ? '✓ Available now' : '🔜 Coming soon'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HomePage;