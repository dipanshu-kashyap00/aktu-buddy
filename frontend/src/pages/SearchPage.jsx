import { useState } from 'react';
import { Link } from 'react-router-dom';
import { searchSubjects } from '../services/subjectAPI';

const getYear = (sem) => Math.ceil(sem / 2);

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setError(false);
    try {
      const res = await searchSubjects(query);
      setResults(res.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 py-8 md:py-12'>
      <div className='max-w-2xl mx-auto px-4'>

        <h1 className='text-2xl md:text-3xl font-bold text-center text-blue-900 mb-1'>Search</h1>
        <p className='text-center text-gray-500 mb-6 md:mb-8 text-sm'>Search by subject name or code</p>

        {/* Search form — full width on mobile */}
        <form onSubmit={handleSearch} className='flex gap-2 mb-6 md:mb-8'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='e.g. Data Structures or KCS-301'
            className='flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 min-w-0'
          />
          <button
            type='submit'
            disabled={loading}
            className='bg-orange-500 text-white px-4 md:px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 active:bg-orange-700 transition text-sm flex-shrink-0 disabled:opacity-60'
          >
            {loading ? '...' : 'Search'}
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div className='space-y-3'>
            {[1, 2, 3].map(i => (
              <div key={i} className='h-16 bg-white rounded-xl animate-pulse border border-gray-100' />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className='text-center text-red-400 py-8 text-sm'>Something went wrong. Try again.</p>
        )}

        {/* No results */}
        {!loading && !error && searched && results.length === 0 && (
          <div className='text-center py-10'>
            <div className='text-4xl mb-3'>😕</div>
            <p className='text-gray-400 text-sm'>No subjects found for "<strong>{query}</strong>"</p>
          </div>
        )}

        {/* Results */}
        {!loading && !error && results.length > 0 && (
          <div className='space-y-2 md:space-y-3'>
            <p className='text-xs text-gray-400 mb-3'>{results.length} result(s) found</p>
            {results.map((subject) => (
              <Link
                key={subject.code}
                to={`/branch/${subject.branch}/year/${getYear(subject.semester)}/notes`}
                className='flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md active:shadow-sm transition p-3 md:p-4 hover:border-orange-300'
              >
                <div className='min-w-0 flex-1'>
                  <div className='text-xs text-orange-500 font-semibold mb-0.5'>{subject.code}</div>
                  <div className='text-sm font-semibold text-gray-800 truncate'>{subject.name}</div>
                  <div className='text-xs text-gray-400 mt-1'>
                    {subject.branch} • Sem {subject.semester} • Year {getYear(subject.semester)}
                  </div>
                </div>
                <span className='text-orange-400 text-lg ml-3 flex-shrink-0'>→</span>
              </Link>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!searched && (
          <div className='text-center py-10 md:py-12'>
            <div className='text-4xl md:text-5xl mb-3'>🔍</div>
            <p className='text-gray-400 text-sm'>Start typing to find subjects</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchPage;