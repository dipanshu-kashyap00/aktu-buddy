const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    fileSize: { type: String },
    uploadedAt: { type: Date, default: Date.now }
});

const quantumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pdfUrl: { type: String, required: true },
    fileSize: { type: String },
    isPopular: { type: Boolean, default: false },
    uploadedAt: { type: Date, default: Date.now }
});

const pyqSchema = new mongoose.Schema({
    year: { type: String, required: true },
    session: { type: String, enum: ['Odd Sem', 'Even Sem'] },
    pdfUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const subjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    branch: { type: String, required: true, index: true },
    semester: { type: Number, required: true, index: true },
    notes: [noteSchema],
    quantum: [quantumSchema],
    pyqs: [pyqSchema],
    syllabusUrl: { type: String },
    importantTopics: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

// Indexes for faster searches
subjectSchema.index({ branch: 1, semester: 1 });
subjectSchema.index({ name: 'text', code: 'text' });

module.exports = mongoose.model('Subject', subjectSchema);