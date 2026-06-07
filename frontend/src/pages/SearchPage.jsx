import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchSubjects } from '../services/subjectAPI';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await searchSubjects(query);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getYear = (sem) => Math.ceil(sem / 2);

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <h1 className='text-3xl font-bold text-center text-blue-900 mb-2'>Search</h1>
        <p className='text-center text-gray-500 mb-8'>Search by subject name or code</p>

        <form onSubmit={handleSearch} className='flex gap-2 mb-8'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. Data Structures or KCS-301'
            className='flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'
          />
          <button type='submit'
            className='bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition'>
            Search
          </button>
        </form>

        {loading && <p className='text-center text-gray-400'>Searching...</p>}

        {!loading && searched && results.length === 0 && (
          <p className='text-center text-gray-400 py-8'>No subjects found for "{query}"</p>
        )}

        {!loading && results.length > 0 && (
          <div className='space-y-3'>
            <p className='text-sm text-gray-500'>{results.length} result(s) found</p>
            {results.map((subject) => (
              <Link
                key={subject.code}
                to={'/branch/' + subject.branch + '/year/' + getYear(subject.semester) + '/notes'}
                className='block bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition p-4 hover:border-orange-300'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='text-xs text-orange-500 font-semibold mb-1'>{subject.code}</div>
                    <div className='text-sm font-semibold text-gray-800'>{subject.name}</div>
                    <div className='text-xs text-gray-400 mt-1'>{subject.branch} • Semester {subject.semester}</div>
                  </div>
                  <span className='text-orange-400 text-lg'>→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!searched && (
          <div className='text-center py-12'>
            <div className='text-5xl mb-4'>🔍</div>
            <p className='text-gray-400'>Start typing to find subjects</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;