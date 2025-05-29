// src/app.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// CRITICAL: Load environment variables BEFORE importing other modules
dotenv.config();

import authRoutes from './routes/authRoutes';
import linkRoutes from './routes/linkRoutes';
import tagRoutes from './routes/tagRoutes';
import errorHandler from './middleware/errorHandler';
import connectDB from './config/db';
import config from './config/config';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/tags', tagRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});

export default app;