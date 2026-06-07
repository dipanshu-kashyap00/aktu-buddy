const express = require('express');
const router = express.Router();
const Branch = require('../models/Branch');

// GET all branches
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find().sort({ order: 1 });
        res.json(branches);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET single branch by code
router.get('/:code', async (req, res) => {
    try {
        const branch = await Branch.findOne({ code: req.params.code });
        if (!branch) return res.status(404).json({ error: 'Branch not found' });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new branch (admin only)
router.post('/', async (req, res) => {
    try {
        const branch = new Branch(req.body);
        await branch.save();
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;