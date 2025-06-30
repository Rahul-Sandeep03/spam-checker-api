import express from 'express';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import { addContact, markSpam } from '../controllers/contact.controller.js';
import { validate, addContactValidation, searchByPhoneValidation } from '../middlewares/validation.middleware.js';
import { searchByPhone, searchByName } from '../controllers/search.controller.js';

const router = express.Router();

router.post('/add', authenticateToken, addContactValidation, validate, addContact);

router.post('/spam', authenticateToken, markSpam);
router.get('/search/phone', authenticateToken, searchByPhoneValidation, validate, searchByPhone);

export default router;
