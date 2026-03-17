const Joi = require('joi');

const createBlogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  author: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  publishedAt: Joi.date().optional()
});

const updateBlogSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  author: Joi.string().optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  publishedAt: Joi.date().optional()
});

module.exports = {
  createBlogSchema,
  updateBlogSchema
};
