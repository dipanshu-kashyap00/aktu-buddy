import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center space-x-2'>
            <span className='text-3xl'>📚</span>
            <span className='font-bold text-xl text-blue-900'>AKTU Buddy</span>
          </Link>

          {/* Desktop Links */}
          <div className='hidden md:flex space-x-6'>
            <Link to='/' className='text-gray-600 hover:text-orange-500 transition'>🏠 Home</Link>
            <Link to='/notes' className='text-gray-600 hover:text-orange-500 transition'>📄 Notes</Link>
            <Link to='/pyqs' className='text-gray-600 hover:text-orange-500 transition'>📜 PYQs</Link>
            <Link to='/search' className='text-gray-600 hover:text-orange-500 transition'>🔍 Search</Link>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className='md:hidden text-gray-600 focus:outline-none'>
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className='md:hidden pb-4 space-y-2'>
            <Link to='/' onClick={() => setOpen(false)} className='block px-4 py-2 text-gray-600 hover:text-orange-500'>🏠 Home</Link>
            <Link to='/notes' onClick={() => setOpen(false)} className='block px-4 py-2 text-gray-600 hover:text-orange-500'>📄 Notes</Link>
            <Link to='/pyqs' onClick={() => setOpen(false)} className='block px-4 py-2 text-gray-600 hover:text-orange-500'>📜 PYQs</Link>
            <Link to='/search' onClick={() => setOpen(false)} className='block px-4 py-2 text-gray-600 hover:text-orange-500'>🔍 Search</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;