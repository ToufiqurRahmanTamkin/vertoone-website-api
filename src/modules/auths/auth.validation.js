const Joi = require('joi');
const { ROLES } = require('../../shared/utils/constants');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid(...Object.values(ROLES))
    .default(ROLES.USER)
});

module.exports = {
  loginSchema,
  createUserSchema
};
