const createNewsletterRepository = require('./newsletter.repository');
const createNewsletterService = require('./newsletter.service');
const emailService = require('../../shared/services/email.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');

const newsletterRepository = createNewsletterRepository();
const newsletterService = createNewsletterService({ newsletterRepository, emailService });

const subscribe = asyncHandler(async (req, res) => {
  const subscription = await newsletterService.subscribe(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'Subscription successful',
    data: subscription
  });
});

module.exports = {
  subscribe
};
