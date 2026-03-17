const express = require('express');
const blogController = require('./blog.controller');
const validate = require('../../shared/middlewares/validate.middleware');
const authenticate = require('../../shared/middlewares/auth.middleware');
const { createBlogSchema, updateBlogSchema } = require('./blog.validation');

const router = express.Router();

/**
 * @openapi
 * /api/v1/blogs:
 *   get:
 *     summary: List blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Blogs fetched
 */
router.get('/', blogController.listBlogs);

/**
 * @openapi
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog fetched
 */
router.get('/:id', blogController.getBlog);

/**
 * @openapi
 * /api/v1/blogs:
 *   post:
 *     summary: Create a blog (authenticated)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created
 */
router.post('/', authenticate, validate(createBlogSchema), blogController.createBlog);

/**
 * @openapi
 * /api/v1/blogs/{id}:
 *   patch:
 *     summary: Update a blog (authenticated)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated
 */
router.patch('/:id', authenticate, validate(updateBlogSchema), blogController.updateBlog);

/**
 * @openapi
 * /api/v1/blogs/{id}:
 *   delete:
 *     summary: Delete a blog (authenticated)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted
 */
router.delete('/:id', authenticate, blogController.deleteBlog);

module.exports = router;
