import { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', purpose: 'General Inquiry', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = encodeURIComponent('Message: ' + form.message + ' | From: ' + form.name + ' | Email: ' + form.email);
    window.location.href = 'mailto:contact@aktu.help?subject=AKTU Buddy - ' + form.purpose + '&body=' + body;
    setSent(true);
  };

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='container mx-auto px-4 max-w-2xl'>
        <h1 className='text-3xl font-bold text-orange-500 mb-1'>Contact Us</h1>
        <p className='text-sm text-gray-400 mb-8'>Last Updated: June 10, 2026</p>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <h2 className='text-lg font-semibold text-blue-900 mb-3'>Website Owner</h2>
          <p className='text-sm text-gray-600'>Name: Dipanshu Kashyap</p>
          <p className='text-sm text-gray-600'>Location: Lucknow, Uttar Pradesh, India</p>
          <p className='text-sm text-gray-600'>Website: AKTU Buddy (aktu.help)</p>
        </div>

        <div className='bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-6 text-sm text-gray-700'>
          Grievance Officer: Dipanshu Kashyap | Response: Acknowledgment within 24 hours, resolution within 15 days.
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6'>
          <h2 className='text-lg font-semibold text-blue-900 mb-4'>Send a Message</h2>
          {sent ? (
            <div className='text-center py-6'>
              <div className='text-4xl mb-2'>✅</div>
              <p className='font-medium text-green-700'>Thanks! Your email client should open now.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                <input type='text' required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'
                  placeholder='Your name' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input type='email' required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'
                  placeholder='your@email.com' />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Purpose</label>
                <select value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'>
                  <option>General Inquiry</option>
                  <option>Copyright / Grievance</option>
                  <option>Content Submission</option>
                  <option>Collaboration</option>
                  <option>Report a Bug</option>
                </select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Message</label>
                <textarea required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400'
                  placeholder='Your message...' />
              </div>
              <button type='submit'
                className='w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition'>
                Send Message
              </button>
            </form>
          )}
        </div>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-lg font-semibold text-blue-900 mb-3'>Submit Study Materials</h2>
          <p className='text-sm text-gray-600 mb-2'>Have notes, quantum booklets, or PYQs to share? Email us with:</p>
          <ul className='text-sm text-gray-500 space-y-1 list-disc list-inside'>
            <li>Subject name and code</li>
            <li>Semester and branch</li>
            <li>PDF file or Google Drive link</li>
            <li>Your name (optional, for credit)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ContactPage;