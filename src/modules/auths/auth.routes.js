const express = require('express');
const authController = require('./auth.controller');
const validate = require('../../shared/middlewares/validate.middleware');
const authenticate = require('../../shared/middlewares/auth.middleware');
const authorize = require('../../shared/middlewares/role.middleware');
const { ROLES } = require('../../shared/utils/constants');
const { loginSchema, createUserSchema } = require('./auth.validation');

const router = express.Router();

/**
 * @openapi
 * /api/v1/auths/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLogin'
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', validate(loginSchema), authController.login);

/**
 * @openapi
 * /api/v1/auths/users:
 *   post:
 *     summary: Create a new user (SUPER_ADMIN only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created
 */
router.post(
  '/users',
  authenticate,
  authorize(ROLES.SUPER_ADMIN),
  validate(createUserSchema),
  authController.createUser
);

/**
 * @openapi
 * /api/v1/auths/users:
 *   get:
 *     summary: List users (SUPER_ADMIN only)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
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
 *         description: Users fetched
 */
router.get('/users', authenticate, authorize(ROLES.SUPER_ADMIN), authController.listUsers);

/**
 * @openapi
 * /api/v1/auths/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched
 */
router.get('/me', authenticate, authController.getProfile);

module.exports = router;
