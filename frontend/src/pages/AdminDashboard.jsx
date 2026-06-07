import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [selected, setSelected] = useState('');
  const [type, setType] = useState('notes');
  const [form, setForm] = useState({ title: '', pdfUrl: '', fileSize: '', year: '', session: 'Odd Sem' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

 useEffect(() => {
  if (!token) { navigate('/admin'); return; }
  api.get('/subjects')
    .then(r => setSubjects(r.data))
    .catch((err) => console.error('Failed to load subjects:', err));
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected) return setMessage('Please select a subject');
    try {
      const payload = type === 'pyqs'
        ? { year: form.year, session: form.session, pdfUrl: form.pdfUrl }
        : { title: form.title, pdfUrl: form.pdfUrl, fileSize: form.fileSize };

      await api.put(`/subjects/${selected}/add-content`,
      { type, content: payload },
      { headers: { Authorization: `Bearer ${token}` } }
     );
      setMessage('✅ Added successfully!');
      setForm({ title: '', pdfUrl: '', fileSize: '', year: '', session: 'Odd Sem' });
    } catch {
      setMessage('❌ Failed to add. Check token or fields.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-secondary">Admin Dashboard</h1>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
        </div>

        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 text-sm">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Subject</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Choose subject --</option>
              {subjects.map(s => (
                <option key={s.code} value={s.code}>{s.code} — {s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
            <div className="flex gap-3">
              {['notes', 'quantum', 'pyqs'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition ${
                    type === t ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {type === 'pyqs' ? (
              <>
                <input
                  placeholder="Year (e.g. 2024-25)"
                  value={form.year}
                  onChange={e => setForm({...form, year: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <select
                  value={form.session}
                  onChange={e => setForm({...form, session: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option>Odd Sem</option>
                  <option>Even Sem</option>
                </select>
              </>
            ) : (
              <>
                <input
                  placeholder="Title (e.g. Unit 1 Notes)"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  placeholder="File size (e.g. 2.4 MB)"
                  value={form.fileSize}
                  onChange={e => setForm({...form, fileSize: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </>
            )}
            <input
              placeholder="Cloudinary PDF URL"
              value={form.pdfUrl}
              onChange={e => setForm({...form, pdfUrl: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition"
            >
              Add {type}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;