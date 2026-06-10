require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');

const branches = ['CSE', 'AI', 'IT', 'ECE', 'ME', 'CE'];

const sem1Subjects = [
  { code: 'BAS103', name: 'Engineering Mathematics – I' },
  { code: 'BME101', name: 'Fundamentals of Mechanical Engineering' },
  { code: 'BAS105', name: 'Soft Skills' },
  { code: 'BAS101', name: 'Engineering Physics' },
  { code: 'BEC101', name: 'Fundamentals of Electronics Engineering' },
];

const sem2Subjects = [
  { code: 'BAS203', name: 'Engineering Mathematics – II' },
  { code: 'BAS202', name: 'Engineering Chemistry' },
  { code: 'BAS204', name: 'Environment and Ecology' },
  { code: 'BEE201', name: 'Fundamentals of Electrical Engineering' },
  { code: 'BCS201', name: 'Programming for Problem Solving' },
];

const generateSubjects = () => {
  const subjects = [];

  for (const branch of branches) {
    // Semester 1
    for (const sub of sem1Subjects) {
      subjects.push({
        code: `${sub.code}-${branch}`,
        name: sub.name,
        branch,
        semester: 1,
        notes: [],
        pyqs: [],
        quantum: [],
        syllabus: [],
      });
    }

    // Semester 2
    for (const sub of sem2Subjects) {
      subjects.push({
        code: `${sub.code}-${branch}`,
        name: sub.name,
        branch,
        semester: 2,
        notes: [],
        pyqs: [],
        quantum: [],
        syllabus: [],
      });
    }
  }

  return subjects;
};

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Remove only Year 1 subjects to avoid wiping future data
    await Subject.deleteMany({ semester: { $in: [1, 2] } });
    console.log('🗑️  Cleared existing Year 1 subjects');

    const subjects = generateSubjects();
    await Subject.insertMany(subjects);

    console.log(`✅ Seeded ${subjects.length} subjects`);
    console.log(`   ${branches.length} branches × 10 subjects = ${subjects.length} total`);

    // Summary
    for (const branch of branches) {
      const count = subjects.filter(s => s.branch === branch).length;
      console.log(`   ${branch}: ${count} subjects`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seed();