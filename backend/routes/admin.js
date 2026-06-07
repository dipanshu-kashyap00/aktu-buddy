const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// POST admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: admin._id, email: admin.email, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({ token, admin: { id: admin._id, email: admin.email, role: admin.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create first admin (run once)
router.post('/setup', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            email,
            password: hashedPassword,
            role: 'admin'
        });
        
        await admin.save();
        res.json({ message: 'Admin created successfully', admin: { email: admin.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;