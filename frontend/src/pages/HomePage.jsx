import { Link } from 'react-router-dom';
import { GiComputerChip } from 'react-icons/gi';
import { MdComputer, MdElectricalServices, MdSettings } from 'react-icons/md';
import { FaRobot, FaLaptopCode } from 'react-icons/fa';

const branches = [
  { code: 'CSE', name: 'Computer Science & Engineering', icon: <MdComputer />, color: 'bg-blue-500', status: 'live' },
  { code: 'AI', name: 'CSE (AI/ML)', icon: <FaRobot />, color: 'bg-green-500', status: 'live' },
  { code: 'IT', name: 'Information Technology', icon: <FaLaptopCode />, color: 'bg-purple-500', status: 'coming-soon' },
  { code: 'ECE', name: 'Electronics & Communication', icon: <MdElectricalServices />, color: 'bg-yellow-500', status: 'coming-soon' },
  { code: 'ME', name: 'Mechanical Engineering', icon: <MdSettings />, color: 'bg-red-500', status: 'coming-soon' },
  { code: 'CE', name: 'Civil Engineering', icon: <GiComputerChip />, color: 'bg-gray-500', status: 'coming-soon' },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AKTU Buddy</h1>
          <p className="text-xl md:text-2xl mb-6">Your friendly guide to AKTU success</p>
          <p className="text-lg opacity-90">Notes • Quantum Booklets • Previous Year Papers</p>
        </div>
      </div>

      {/* Branches Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-secondary mb-8">Select Your Branch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <Link
              key={branch.code}
              to={branch.status === 'live' ? `/branch/${branch.code}` : '#'}
              className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 ${
                branch.status === 'coming-soon' ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <div className={`${branch.color} p-4 text-white text-4xl flex justify-center`}>
                {branch.icon}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
                <p className="text-gray-600 text-sm">
                  {branch.status === 'live' ? '✓ Available Now' : '🔜 Coming Soon'}
                </p>
                {branch.status === 'live' && (
                  <span className="inline-block mt-3 text-primary font-medium">Explore →</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;