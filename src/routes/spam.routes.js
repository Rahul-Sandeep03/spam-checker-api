import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { markSpam } from '../controllers/spam.controller.js';

const router = express.Router();

router.post('/mark', authenticateToken, markSpam);

export default router;
