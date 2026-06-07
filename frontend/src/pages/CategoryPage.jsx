import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSubjectsBySemester, getSubjectByCode } from '../services/subjectAPI';

const FileItem = ({ pdfUrl, title, fileSize, year, session }) => (
  <div className='flex items-center gap-2 p-2 rounded hover:bg-orange-50'>
    <div className='w-7 h-7 bg-red-100 rounded flex items-center justify-center flex-shrink-0'>
      <span className='text-red-500 text-xs font-bold'>PDF</span>
    </div>
    <div className='flex-1 min-w-0'>
      <div className='text-xs font-medium text-gray-700 truncate'>{title || (year + ' - ' + session)}</div>
      {fileSize && <div className='text-xs text-gray-400'>{fileSize}</div>}
    </div>
    <a href={pdfUrl} target='_blank' rel='noopener noreferrer'
      className='text-orange-500 text-xs font-semibold hover:underline flex-shrink-0'>
      Open
    </a>
  </div>
);

const SubjectFiles = ({ subjectCode, category }) => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const toggle = async () => {
    setOpen(!open);
    if (!data) {
      const res = await getSubjectByCode(subjectCode);
      setData(res.data);
    }
  };

  const getFiles = () => {
    if (!data) return [];
    if (category === 'pyq') return data.pyqs || [];
    if (category === 'quantum') return data.quantum || [];
    return data.notes || [];
  };

  return (
    <div className='bg-white rounded-lg border border-gray-100 overflow-hidden mb-2'>
      <button onClick={toggle} className='w-full flex justify-between items-center p-3 hover:bg-gray-50 text-left'>
        <span className='text-sm font-medium text-gray-700'>{subjectCode}</span>
        <span className='text-gray-400'>{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <div className='border-t px-3 pb-3 pt-2 space-y-1'>
          {!data && <p className='text-xs text-gray-400'>Loading...</p>}
          {data && getFiles().length === 0 && <p className='text-xs text-gray-400 py-2 text-center'>Coming soon</p>}
          {data && getFiles().map((f, i) => <FileItem key={i} {...f} />)}
        </div>
      )}
    </div>
  );
};

const SemColumn = ({ semNum, branchCode, category }) => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjectsBySemester(branchCode, semNum).then(r => setSubjects(r.data));
  }, []);

  return (
    <div>
      <h2 className='text-lg font-bold text-blue-900 mb-3 pb-2 border-b flex items-center gap-2'>
        <span className='bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full'>Sem {semNum}</span>
        {subjects.length} Subjects
      </h2>
      {subjects.map(s => (
        <SubjectFiles key={s.code} subjectCode={s.code} category={category} />
      ))}
    </div>
  );
};

const CategoryPage = () => {
  const { branchCode, year, category } = useParams();
  const yearNum = parseInt(year);
  const sem1 = yearNum * 2 - 1;
  const sem2 = yearNum * 2;
  const labels = { notes: 'Notes', pyq: 'Previous Year Papers', quantum: 'Quantum Booklets', syllabus: 'Syllabus' };
  const emojis = { notes: '📚', pyq: '📝', quantum: '📖', syllabus: '📋' };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl font-bold text-center text-blue-900 mb-1'>{emojis[category]} {labels[category]}</h1>
        <p className='text-center text-gray-500 mb-10'>{branchCode} — Year {year}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          <SemColumn semNum={sem1} branchCode={branchCode} category={category} />
          <SemColumn semNum={sem2} branchCode={branchCode} category={category} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;