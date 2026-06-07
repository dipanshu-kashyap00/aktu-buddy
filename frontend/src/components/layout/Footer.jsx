import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='bg-blue-900 text-white mt-auto'>
    <div className='container mx-auto px-4 py-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

        <div>
          <h3 className='text-lg font-bold mb-3'>📚 AKTU Buddy</h3>
          <p className='text-sm text-blue-200'>Your friendly guide to AKTU success. Notes, PYQs and Quantum — all free.</p>
          <p className='text-sm text-blue-300 mt-2'>Owner: Dipanshu Kashyap</p>
          <p className='text-sm text-blue-300'>Lucknow, Uttar Pradesh, India</p>
        </div>

        <div>
          <h3 className='text-lg font-bold mb-3'>Quick Links</h3>
          <ul className='space-y-2 text-sm text-blue-200'>
            <li><Link to='/' className='hover:text-white transition'>🏠 Home</Link></li>
            <li><Link to='/notes' className='hover:text-white transition'>📚 All Notes</Link></li>
            <li><Link to='/pyqs' className='hover:text-white transition'>📝 All PYQs</Link></li>
            <li><Link to='/search' className='hover:text-white transition'>🔍 Search</Link></li>
            <li><Link to='/contact' className='hover:text-white transition'>📞 Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='text-lg font-bold mb-3'>Legal</h3>
          <ul className='space-y-2 text-sm text-blue-200'>
            <li><Link to='/terms' className='hover:text-white transition'>Terms and Conditions</Link></li>
            <li><Link to='/privacy' className='hover:text-white transition'>Privacy Policy</Link></li>
            <li><Link to='/disclaimer' className='hover:text-white transition'>Disclaimer</Link></li>
          </ul>
        </div>

      </div>
      <div className='border-t border-blue-800 mt-8 pt-6 text-center text-sm text-blue-300'>
        <p>© 2026 AKTU Buddy. All rights reserved.</p>
        <p className='mt-1'>Not affiliated with AKTU. For educational purposes only.</p>
      </div>
    </div>
  </footer>
);

export default Footer;