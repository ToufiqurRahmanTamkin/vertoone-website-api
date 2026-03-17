const createAppError = require('../../shared/utils/app-error');

const createNewsletterService = ({ newsletterRepository, emailService }) => {
  const subscribe = async (payload) => {
    const existing = await newsletterRepository.findByEmail(payload.email);

    if (existing) {
      throw createAppError('Email already subscribed', 409);
    }

    const subscription = await newsletterRepository.create(payload);

    await emailService.sendEmail({
      to: subscription.email,
      subject: 'Welcome to the Vertoone newsletter',
      template: 'newsletter-welcome.html',
      context: { email: subscription.email }
    });

    return subscription;
  };

  return {
    subscribe
  };
};

module.exports = createNewsletterService;
