const createContactRepository = require('./contact.repository');
const createContactService = require('./contact.service');
const emailService = require('../../shared/services/email.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');

const contactRepository = createContactRepository();
const contactService = createContactService({ contactRepository, emailService });

const createContact = asyncHandler(async (req, res) => {
  const contact = await contactService.createContact(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'Contact submitted successfully',
    data: contact
  });
});

module.exports = {
  createContact
};
