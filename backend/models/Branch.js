const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    icon: { type: String },
    semesters: { type: Number, default: 8 },
    subjectCount: { type: Number, default: 0 },
    status: { type: String, enum: ['live', 'coming-soon'], default: 'coming-soon' },
    order: { type: Number, default: 0 }
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);