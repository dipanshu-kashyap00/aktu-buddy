const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET all subjects (with filters)
router.get('/', async (req, res) => {
    try {
        const { branch, semester, search } = req.query;
        let filter = {};
        
        if (branch) filter.branch = branch;
        if (semester) filter.semester = parseInt(semester);
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { code: { $regex: search, $options: 'i' } }
            ];
        }
        
        const subjects = await Subject.find(filter).sort({ semester: 1, code: 1 });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single subject by code
router.get('/:code', async (req, res) => {
    try {
        const subject = await Subject.findOne({ code: req.params.code });
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET subjects by branch and semester
router.get('/branch/:branch/semester/:semester', async (req, res) => {
    try {
        const subjects = await Subject.find({
            branch: req.params.branch,
            semester: parseInt(req.params.semester)
        }).sort({ code: 1 });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new subject (admin only - add auth later)
router.post('/', async (req, res) => {
    try {
        const subject = new Subject(req.body);
        await subject.save();
        res.status(201).json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT update subject (admin only)
router.put('/:code', async (req, res) => {
    try {
        const subject = await Subject.findOneAndUpdate(
            { code: req.params.code },
            req.body,
            { new: true, runValidators: true }
        );
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json(subject);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;