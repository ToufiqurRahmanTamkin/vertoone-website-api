const Joi = require('joi');

const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.string().required(),
  salary: Joi.string().optional()
});

const updateJobSchema = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  location: Joi.string().optional(),
  type: Joi.string().optional(),
  salary: Joi.string().optional()
});

module.exports = {
  createJobSchema,
  updateJobSchema
};
