const express = require('express');
const newsletterController = require('./newsletter.controller');
const validate = require('../../shared/middlewares/validate.middleware');
const { subscribeSchema } = require('./newsletter.validation');

const router = express.Router();

/**
 * @openapi
 * /api/v1/newsletters/subscribe:
 *   post:
 *     summary: Subscribe to the newsletter
 *     tags: [Newsletters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsletterSubscription'
 *     responses:
 *       201:
 *         description: Subscription successful
 */
router.post('/subscribe', validate(subscribeSchema), newsletterController.subscribe);

module.exports = router;
