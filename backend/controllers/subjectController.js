// backend/controllers/subjectController.js
import { param, validationResult } from 'express-validator';

export const getSubjectsByBranch = [
  param('branch').isString().trim().escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { branch } = req.params;
    // Your logic here
  }
];

// backend/controllers/subjectController.js
export const getFilesBySubject = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
  
  const files = await File.find({ subjectId })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  
  const total = await File.countDocuments({ subjectId });
  
  res.json({
    data: files,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};