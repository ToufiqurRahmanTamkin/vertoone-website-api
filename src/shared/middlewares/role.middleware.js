const createAppError = require('../utils/app-error');

const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(createAppError('You do not have permission to perform this action', 403));
  }

  return next();
};

module.exports = authorize;
