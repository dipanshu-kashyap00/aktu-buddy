import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
    <div className='text-center px-4'>
      <div className='text-8xl mb-4'>📭</div>
      <h1 className='text-4xl font-bold text-blue-900 mb-2'>404</h1>
      <p className='text-gray-500 mb-6'>Oops! This page does not exist.</p>
      <Link to='/'
        className='bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition'>
        Go Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;