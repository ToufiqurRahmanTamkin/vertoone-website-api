const Contact = require('./contact.model');

const createContactRepository = (model = Contact) => {
  const create = (data) => model.create(data);

  return {
    create
  };
};

module.exports = createContactRepository;
