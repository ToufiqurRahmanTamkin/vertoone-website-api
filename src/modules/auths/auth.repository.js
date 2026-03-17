const bcrypt = require('bcryptjs');
const User = require('./auth.model');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const createAuthRepository = (model = User) => {
  const create = async (data) => {
    const payload = { ...data };

    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }

    return model.create(payload);
  };

  const findByEmail = (email, includePassword = false) => {
    const query = model.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select('+password');
    }
    return query;
  };

  const findById = (id) => model.findById(id).select('-password');

  const findAll = ({ skip, limit }) =>
    model
      .find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

  const count = () => model.countDocuments();

  return {
    create,
    findByEmail,
    findById,
    findAll,
    count
  };
};

module.exports = createAuthRepository;
