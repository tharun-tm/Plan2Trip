import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/health', healthRouter);

// Root Endpoints
app.get(['/', '/api'], (req, res) => {
  res.json({
    name: 'TripWise Backend API',
    status: 'running',
    healthCheck: '/api/health',
  });
});

// Error handling middleware
app.use(errorHandler);

// Listen locally if process is run directly (local dev)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 TripWise Backend running on http://localhost:${PORT}`);
    console.log(`🏥 Health Check available at http://localhost:${PORT}/api/health`);
  });
}

export default app;
