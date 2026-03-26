const { connectToDatabase } = require('../database/connection');
const logger = require('../utils/logger');

const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    logger.error('Database connection failed in middleware', error);
    // Determine if it's an auth error from Mongo
    if (error.message && (error.message.includes('Authentication failed') || error.message.includes('bad auth'))) {
      return res.status(500).json({
        success: false,
        message: 'Database authentication failed. Please check your MONGODB_URI credentials.'
      });
    }
    next(error);
  }
};

module.exports = dbConnectMiddleware;
