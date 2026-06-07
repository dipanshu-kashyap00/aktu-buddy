import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  if (parts.length === 0) return null;

  const crumbs = [{ label: 'Home', path: '/' }];
  let currentPath = '';

  parts.forEach((part, i) => {
    currentPath += '/' + part;
    const label = part.charAt(0).toUpperCase() + part.slice(1);
    crumbs.push({ label, path: currentPath });
  });

  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto px-4 py-2 flex items-center gap-2 text-sm text-gray-500'>
        {crumbs.map((crumb, i) => (
          <span key={crumb.path} className='flex items-center gap-2'>
            {i > 0 && <span>›</span>}
            {i === crumbs.length - 1 ? (
              <span className='text-orange-500 font-medium'>{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className='hover:text-orange-500 transition'>{crumb.label}</Link>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;