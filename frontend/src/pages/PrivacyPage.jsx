const PrivacyPage = () => (
  <div className='min-h-screen bg-gray-50 py-12'>
    <div className='container mx-auto px-4 max-w-3xl'>
      <h1 className='text-3xl font-bold text-orange-500 mb-1'>Privacy Policy</h1>
      <p className='text-sm text-gray-400 mb-6'>Last Updated: June 10, 2026</p>
      <p className='text-sm text-gray-600 mb-6'>Website: AKTU Buddy | Owner: Dipanshu Kashyap | Lucknow, Uttar Pradesh, India</p>
      <div className='bg-orange-50 border-l-4 border-orange-500 p-4 rounded mb-6 text-sm text-gray-700'>
        We collect MINIMAL personal data. As a student-focused platform, your privacy is our priority.
      </div>
      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6 text-gray-600 text-sm leading-relaxed'>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>1. Information We Collect</h2>
          <p>We collect anonymous usage data via analytics (pages visited, time spent, device type) and basic server logs (IP address, browser type). We do NOT collect names, email addresses, phone numbers, or payment information. No signup is required.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>2. How We Use Your Information</h2>
          <p>To improve website content and user experience, understand which subjects are most popular, diagnose technical issues, and prevent abuse or attacks on the website.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>3. Cookies</h2>
          <p>AKTU Buddy uses essential cookies for website functionality. We may use analytics cookies to understand user behavior. You can disable cookies in your browser settings.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>4. Third-Party Services</h2>
          <p>We use Vercel (frontend hosting), Render (backend hosting), MongoDB Atlas (database), Cloudinary (PDF storage), and Google Analytics. Each has its own privacy policy.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>5. Data Security</h2>
          <p>We use HTTPS encryption, secure database connections, and regular security updates. However, no internet transmission is 100% secure.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>6. Your Rights (Under Indian DPDP Act, 2023)</h2>
          <p>You have the right to access, correct, and request deletion of your data, and to file a grievance if you believe your privacy rights are violated.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>7. Grievance Officer (As per IT Rules, 2021)</h2>
          <p>Name: Dipanshu Kashyap | Location: Lucknow, Uttar Pradesh | Response: 24 hours acknowledgment, 15 days resolution.</p>
        </div>
        <div>
          <h2 className='text-lg font-semibold text-blue-900 mb-2'>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy. The Last Updated date at the top will reflect any changes.</p>
        </div>
      </div>
    </div>
  </div>
);
export default PrivacyPage;