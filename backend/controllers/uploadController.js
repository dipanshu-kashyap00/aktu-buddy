import { logger } from '../utils/logger.js';

try {
  // something
} catch (error) {
  logger.error('Upload failed:', { error: error.message, stack: error.stack });
  res.status(500).json({ 
    message: 'Upload failed',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}