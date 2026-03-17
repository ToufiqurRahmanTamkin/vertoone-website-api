const express = require('express');
const contactController = require('./contact.controller');
const validate = require('../../shared/middlewares/validate.middleware');
const { createContactSchema } = require('./contact.validation');

const router = express.Router();

/**
 * @openapi
 * /api/v1/contacts:
 *   post:
 *     summary: Submit a contact form
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Contact'
 *     responses:
 *       201:
 *         description: Contact submitted
 */
router.post('/', validate(createContactSchema), contactController.createContact);

module.exports = router;
