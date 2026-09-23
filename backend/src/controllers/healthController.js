export const getHealth = (req, res) => {
  res.json({
    status: 'ok',
    message: 'TripWise API Service is healthy',
    timestamp: new Date().toISOString(),
    service: 'tripwise-backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
};
