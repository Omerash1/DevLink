// src/config/config.ts

// Environment variables with defaults
const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/devlink',
  jwtSecret: process.env.JWT_SECRET || 'devlink_secret_key_for_development',
  corsOrigins: process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',') 
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000']
};

export default config;