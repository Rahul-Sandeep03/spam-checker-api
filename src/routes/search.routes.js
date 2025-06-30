import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { searchByName, searchByPhone } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/name', authenticateToken, searchByName);
router.get('/phone', authenticateToken, searchByPhone);

export default router;
