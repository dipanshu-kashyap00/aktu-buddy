import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">📚</span>
            <span className="font-bold text-xl text-blue-900">AKTU Buddy</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-orange-500 transition">
              🏠 Home
            </Link>
            <Link to="/notes/all" className="text-gray-600 hover:text-orange-500 transition">
              📄 Notes
            </Link>
            <Link to="/quantum/all" className="text-gray-600 hover:text-orange-500 transition">
              📖 Quantum
            </Link>
            <Link to="/pyqs/all" className="text-gray-600 hover:text-orange-500 transition">
              📜 PYQs
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-orange-500 transition">
              🔍 Search
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-orange-500 transition">
              👤 Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;