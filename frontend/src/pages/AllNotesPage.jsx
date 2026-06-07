import { useEffect, useState } from 'react';
import api from '../services/api';

const AllNotesPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subjects').then(r => {
      const withNotes = r.data.filter(s => s.notes && s.notes.length > 0);
      setSubjects(withNotes);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-xl'>Loading notes...</div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <h1 className='text-3xl font-bold text-center text-blue-900 mb-2'>📚 All Notes</h1>
        <p className='text-center text-gray-500 mb-10'>Browse all available notes across all subjects</p>

        {subjects.length === 0 ? (
          <div className='text-center py-12'>
            <div className='text-5xl mb-4'>📭</div>
            <p className='text-gray-400'>No notes uploaded yet</p>
          </div>
        ) : (
          <div className='space-y-4'>
            {subjects.map(subject => (
              <div key={subject.code} className='bg-white rounded-xl shadow-sm border border-gray-100 p-5'>
                <div className='flex items-center gap-3 mb-3'>
                  <div>
                    <div className='text-xs text-orange-500 font-semibold'>{subject.code}</div>
                    <div className='text-sm font-bold text-gray-800'>{subject.name}</div>
                    <div className='text-xs text-gray-400'>{subject.branch} • Semester {subject.semester}</div>
                  </div>
                </div>
                <div className='space-y-2'>
                  {subject.notes.map((note, i) => (
                    <div key={i} className='flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-orange-50 transition'>
                      <div className='w-8 h-8 bg-red-100 rounded flex items-center justify-center flex-shrink-0'>
                        <span className='text-red-500 text-xs font-bold'>PDF</span>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <div className='text-sm font-medium text-gray-700 truncate'>{note.title}</div>
                        {note.fileSize && <div className='text-xs text-gray-400'>{note.fileSize}</div>}
                      </div>
                      <a href={note.pdfUrl} target='_blank' rel='noopener noreferrer'
                        className='text-orange-500 text-xs font-semibold hover:underline flex-shrink-0'>
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotesPage;