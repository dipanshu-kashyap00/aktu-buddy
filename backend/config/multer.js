const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure temp upload directory exists
const TEMP_DIR = path.join(__dirname, '..', 'uploads', 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ========== Storage ==========
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR);
  },
  filename: (req, file, cb) => {
    // Sanitize original filename — remove spaces and special chars
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}-${sanitized}`);
  },
});

// ========== File Type Validation ==========
// IMPORTANT: mimetype can be spoofed by the client.
// For a study-material platform PDFs/docs are sufficient.
// For higher security, add file-type package to check magic bytes.
const ALLOWED_MIMES = [
  'application/pdf',
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mimeOk = ALLOWED_MIMES.includes(file.mimetype);
  const extOk = ALLOWED_EXTENSIONS.includes(ext);

  if (mimeOk && extOk) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file. Only PDF, DOC, DOCX are allowed. Got: ${file.mimetype}`
      ),
      false
    );
  }
};

// ========== Export configured multer instance ==========
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max
    files: 1, // one file per request
  },
});

module.exports = upload;