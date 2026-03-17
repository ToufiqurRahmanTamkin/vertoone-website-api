const express = require('express');
const jobController = require('./job.controller');
const validate = require('../../shared/middlewares/validate.middleware');
const authenticate = require('../../shared/middlewares/auth.middleware');
const { createJobSchema, updateJobSchema } = require('./job.validation');

const router = express.Router();

/**
 * @openapi
 * /api/v1/jobs:
 *   get:
 *     summary: List jobs
 *     tags: [Jobs]
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
 *         description: Jobs fetched
 */
router.get('/', jobController.listJobs);

/**
 * @openapi
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Get job by ID
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job fetched
 */
router.get('/:id', jobController.getJob);

/**
 * @openapi
 * /api/v1/jobs:
 *   post:
 *     summary: Create a job (authenticated)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created
 */
router.post('/', authenticate, validate(createJobSchema), jobController.createJob);

/**
 * @openapi
 * /api/v1/jobs/{id}:
 *   patch:
 *     summary: Update a job (authenticated)
 *     tags: [Jobs]
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
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated
 */
router.patch('/:id', authenticate, validate(updateJobSchema), jobController.updateJob);

/**
 * @openapi
 * /api/v1/jobs/{id}:
 *   delete:
 *     summary: Delete a job (authenticated)
 *     tags: [Jobs]
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
 *         description: Job deleted
 */
router.delete('/:id', authenticate, jobController.deleteJob);

module.exports = router;
