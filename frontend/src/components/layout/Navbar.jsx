import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NAV_LINKS = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/notes', label: 'Notes', emoji: '📄' },
  { to: '/pyqs', label: 'PYQs', emoji: '📜' },
  { to: '/search', label: 'Search', emoji: '🔍' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-4'>
        <div className='flex justify-between items-center h-14 md:h-16'>

          {/* Logo */}
          <Link to='/' onClick={() => setOpen(false)}
            className='flex items-center gap-2 flex-shrink-0'>
            <span className='text-2xl'>📚</span>
            <span className='font-bold text-lg md:text-xl text-blue-900'>AKTU Buddy</span>
          </Link>

          {/* Desktop Links */}
          <div className='hidden md:flex items-center gap-1'>
            {NAV_LINKS.map(({ to, label, emoji }) => (
              <Link key={to} to={to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(to)
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                }`}>
                {emoji} {label}
              </Link>
            ))}
          </div>

          {/* Hamburger — larger tap target for mobile */}
          <button
            onClick={() => setOpen(!open)}
            className='md:hidden w-10 h-10 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition'
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {/* Custom hamburger icon — renders reliably on all phones */}
            {open ? (
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu — slides down */}
      {open && (
        <div className='md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1'>
          {NAV_LINKS.map(({ to, label, emoji }) => (
            <Link key={to} to={to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition ${
                isActive(to)
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
              }`}>
              <span className='text-base'>{emoji}</span>
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;