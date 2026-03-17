const jwt = require('jsonwebtoken');
const config = require('../config');
const createAppError = require('../utils/app-error');
const logger = require('../utils/logger');

const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return next(createAppError('Authentication token is missing', 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    return next();
  } catch (error) {
    logger.warn('JWT verification failed', error);
    return next(createAppError('Invalid or expired token', 401));
  }
};

module.exports = authenticate;
