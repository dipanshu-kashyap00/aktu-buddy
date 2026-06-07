import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineDescription, MdOutlineQuiz } from 'react-icons/md';
import { GiBookshelf } from 'react-icons/gi';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <GiBookshelf className="text-3xl text-primary" />
            <span className="font-bold text-xl text-secondary">AKTU Buddy</span>
          </Link>

          {/* Navigation Icons */}
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition">
              <AiOutlineHome className="text-2xl" />
            </Link>
            <Link to="/notes/all" className="text-gray-600 hover:text-primary transition">
              <MdOutlineDescription className="text-2xl" />
            </Link>
            <Link to="/quantum/all" className="text-gray-600 hover:text-primary transition">
              <MdOutlineQuiz className="text-2xl" />
            </Link>
            <Link to="/pyqs/all" className="text-gray-600 hover:text-primary transition">
              <AiOutlineSearch className="text-2xl" />
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-primary transition">
              <AiOutlineSearch className="text-2xl" />
            </Link>
            <Link to="/admin" className="text-gray-600 hover:text-primary transition">
              <AiOutlineUser className="text-2xl" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;