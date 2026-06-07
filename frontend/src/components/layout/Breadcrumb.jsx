import { Link, useLocation } from 'react-router-dom';

const formatLabel = (part) => {
  const labels = {
    'branch': null,
    'year': null,
    'notes': 'Notes',
    'pyq': 'PYQ',
    'quantum': 'Quantum',
    'syllabus': 'Syllabus',
    'CSE': 'CSE',
    'AI': 'AI',
    'IT': 'IT',
    'ECE': 'ECE',
    'ME': 'ME',
    'CE': 'CE',
    '1': 'Year 1',
    '2': 'Year 2',
    '3': 'Year 3',
    '4': 'Year 4',
  };
  if (labels[part] !== undefined) return labels[part];
  return part.charAt(0).toUpperCase() + part.slice(1);
};

const Breadcrumb = () => {
  const location = useLocation();
  const parts = location.pathname.split('/').filter(Boolean);

  if (parts.length === 0) return null;

  const crumbs = [{ label: 'Home', path: '/' }];
  let currentPath = '';

  parts.forEach((part) => {
    currentPath += '/' + part;
    const label = formatLabel(part);
    if (label === null) return;
    crumbs.push({ label, path: currentPath });
  });

  if (crumbs.length <= 1) return null;

  return (
    <div className='bg-white border-b'>
      <div className='container mx-auto px-4 py-2 flex items-center gap-2 text-sm text-gray-500 flex-wrap'>
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