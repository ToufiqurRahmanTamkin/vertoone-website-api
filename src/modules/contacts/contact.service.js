const handlebars = require('handlebars');
const config = require('../../shared/config');

const createContactService = ({ contactRepository, emailService }) => {
  const createContact = async (payload) => {
    const contact = await contactRepository.create(payload);

    await emailService.sendEmail({
      to: contact.email,
      subject: 'Thanks for contacting Vertoone',
      template: 'contact-confirmation.html',
      context: {
        firstName: contact.firstName,
        subject: contact.subject
      }
    });

    if (config.email.adminNotificationEmail) {
      const escape = handlebars.escapeExpression;
      const safeName = escape(`${contact.firstName} ${contact.lastName}`);
      const safeSubject = escape(contact.subject);
      const safeMessage = escape(contact.message);

      await emailService.sendEmail({
        to: config.email.adminNotificationEmail,
        subject: `New contact request: ${contact.subject}`,
        html: `<p>${safeName} sent a message.</p><p><strong>Subject:</strong> ${safeSubject}</p><p>${safeMessage}</p>`
      });
    }

    return contact;
  };

  return {
    createContact
  };
};

module.exports = createContactService;
