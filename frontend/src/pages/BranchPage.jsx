import { useParams, Link } from 'react-router-dom';

const BranchPage = () => {
  const { branchCode } = useParams();
  
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  
  const branchNames = {
    CSE: 'Computer Science & Engineering',
    AI: 'CSE (AI/ML)',
    IT: 'Information Technology',
    ECE: 'Electronics & Communication'
  };
  
  const branchName = branchNames[branchCode] || branchCode;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-4">
          {branchName}
        </h1>
        <p className="text-center text-gray-600 mb-12">Select Semester</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {semesters.map((sem) => (
            <Link
              key={sem}
              to={`/branch/${branchCode}/semester/${sem}`}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-6 text-center border-2 border-gray-100 hover:border-primary"
            >
              <div className="text-3xl font-bold text-primary mb-2">{sem}</div>
              <div className="text-sm text-gray-600">Semester</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BranchPage;