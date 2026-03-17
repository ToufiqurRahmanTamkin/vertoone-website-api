const logger = require('../utils/logger');

const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    logger.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
