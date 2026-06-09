// backend/controllers/subjectController.js
// Uses CommonJS (require/module.exports) — matches rest of backend

const Subject = require('../models/Subject');

// GET subjects by branch and semester (with validation)
const getSubjectsByBranch = async (req, res) => {
  try {
    const { branch, semester } = req.params;

    if (!branch || !semester) {
      return res.status(400).json({ error: 'Branch and semester are required' });
    }

    const semNum = parseInt(semester);
    if (isNaN(semNum) || semNum < 1 || semNum > 8) {
      return res.status(400).json({ error: 'Semester must be a number between 1 and 8' });
    }

    const subjects = await Subject.find({
      branch: branch.toUpperCase().trim(),
      semester: semNum,
    }).sort({ code: 1 });

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};

// GET subjects with pagination (for future use)
const getFilesBySubject = async (req, res) => {
  try {
    const { code } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const subject = await Subject.findOne({ code: code.toUpperCase().trim() });
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    // Return paginated notes (extend for pyqs/quantum as needed)
    const allFiles = subject.notes || [];
    const paginated = allFiles.slice(skip, skip + limit);

    res.json({
      data: paginated,
      pagination: {
        page,
        limit,
        total: allFiles.length,
        pages: Math.ceil(allFiles.length / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

module.exports = { getSubjectsByBranch, getFilesBySubject };