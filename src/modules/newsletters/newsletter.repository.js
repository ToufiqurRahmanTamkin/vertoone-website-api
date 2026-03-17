const Newsletter = require('./newsletter.model');

const createNewsletterRepository = (model = Newsletter) => {
  const create = (data) => model.create(data);

  const findByEmail = (email) => model.findOne({ email: email.toLowerCase() });

  return {
    create,
    findByEmail
  };
};

module.exports = createNewsletterRepository;
