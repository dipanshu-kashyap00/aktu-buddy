import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">AKTU Buddy</h3>
            <p className="text-gray-400 text-sm">Your friendly guide to AKTU success</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li><Link to="/notes/all" className="hover:text-primary">All Notes</Link></li>
              <li><Link to="/quantum/all" className="hover:text-primary">All Quantum</Link></li>
              <li><Link to="/pyqs/all" className="hover:text-primary">All PYQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Owner</h4>
            <p className="text-sm text-gray-400">Dipanshu Kashyap<br/>Lucknow, India</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2026 AKTU Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;