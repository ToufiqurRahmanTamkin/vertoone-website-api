const createAppError = require('../utils/app-error');

const validate = (schema) => (req, _res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const message = error.details.map((detail) => detail.message).join(', ');
    return next(createAppError(message, 400));
  }

  req.body = value;
  return next();
};

module.exports = validate;
