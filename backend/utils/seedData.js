const mongoose = require('mongoose');
require('dotenv').config();
const Subject = require('../models/Subject');

const subjectsData = [
    // Semester 1
    { name: "Engineering Mathematics-I", code: "KAS-101", branch: "CSE", semester: 1 },
    { name: "Engineering Mathematics-II", code: "KAS-102", branch: "CSE", semester: 1 },
    { name: "Engineering Physics", code: "KAS-103", branch: "CSE", semester: 1 },
    { name: "Engineering Chemistry", code: "KAS-104", branch: "CSE", semester: 1 },
    { name: "Programming for Problem Solving", code: "KCS-101", branch: "CSE", semester: 1 },
    
    // Semester 2
    { name: "Computer System & Programming in C", code: "KCS-102", branch: "CSE", semester: 2 },
    
    // Semester 3
    { name: "Data Structures", code: "KCS-301", branch: "CSE", semester: 3 },
    { name: "Digital Logic Design", code: "KCS-302", branch: "CSE", semester: 3 },
    { name: "Discrete Structures", code: "KCS-303", branch: "CSE", semester: 3 },
    { name: "Computer Organization", code: "KCS-304", branch: "CSE", semester: 3 },
    { name: "Object Oriented Programming", code: "KCS-305", branch: "CSE", semester: 3 },
    
    // Semester 4
    { name: "Operating Systems", code: "KCS-401", branch: "CSE", semester: 4 },
    { name: "Database Management Systems", code: "KCS-402", branch: "CSE", semester: 4 },
    { name: "Design & Analysis of Algorithms", code: "KCS-403", branch: "CSE", semester: 4 },
    { name: "Theory of Automata", code: "KCS-404", branch: "CSE", semester: 4 },
    { name: "Python Programming", code: "KCS-405", branch: "CSE", semester: 4 },
    
    // Semester 5
    { name: "Computer Networks", code: "KCS-501", branch: "CSE", semester: 5 },
    { name: "Software Engineering", code: "KCS-502", branch: "CSE", semester: 5 },
    { name: "Web Technologies", code: "KCS-503", branch: "CSE", semester: 5 },
    { name: "Microprocessors", code: "KCS-504", branch: "CSE", semester: 5 },
    { name: "Compiler Design", code: "KCS-505", branch: "CSE", semester: 5 },
    
    // Semester 6
    { name: "Artificial Intelligence", code: "KCS-601", branch: "CSE", semester: 6 },
    { name: "Machine Learning", code: "KCS-602", branch: "CSE", semester: 6 },
    { name: "Cloud Computing", code: "KCS-603", branch: "CSE", semester: 6 },
    { name: "Information Security", code: "KCS-604", branch: "CSE", semester: 6 },
    { name: "Data Mining", code: "KCS-605", branch: "CSE", semester: 6 },
    
    // Semester 7 (Electives)
    { name: "Big Data Analytics", code: "KCS-701", branch: "CSE", semester: 7 },
    { name: "Internet of Things", code: "KCS-702", branch: "CSE", semester: 7 },
    { name: "Blockchain Technology", code: "KCS-703", branch: "CSE", semester: 7 },
    { name: "Deep Learning", code: "KCS-704", branch: "CSE", semester: 7 },
    
    // Semester 8 (Electives)
    { name: "Cyber Security", code: "KCS-801", branch: "CSE", semester: 8 },
    { name: "Mobile Computing", code: "KCS-802", branch: "CSE", semester: 8 },
];

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Subject.deleteMany({ branch: "CSE" });
        console.log('Cleared existing CSE subjects');
        
        // Insert new data
        await Subject.insertMany(subjectsData);
        console.log(`✅ Added ${subjectsData.length} CSE subjects`);
        
        console.log('Seeding completed!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedData();