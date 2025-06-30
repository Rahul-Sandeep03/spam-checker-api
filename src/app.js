import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import searchRoutes from './routes/search.routes.js';
import spamRoutes from './routes/spam.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/contacts/search', searchRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/spam', spamRoutes);

export default app;
