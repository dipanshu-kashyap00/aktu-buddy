import { downloadLimiter } from '../middleware/rateLimiter.js';
router.get('/:fileId', downloadLimiter, downloadController.downloadFile);