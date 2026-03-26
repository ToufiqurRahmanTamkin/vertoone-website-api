const { connectToDatabase } = require('../database/connection');
const logger = require('../utils/logger');

const dbConnectMiddleware = async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    logger.error('Database connection failed in middleware', error);
    next(error);
  }
};

module.exports = dbConnectMiddleware;
