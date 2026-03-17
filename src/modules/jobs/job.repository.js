const Job = require('./job.model');

const createJobRepository = (model = Job) => {
  const create = (data) => model.create(data);

  const findAll = ({ skip, limit }) =>
    model.find().sort({ createdAt: -1 }).skip(skip).limit(limit);

  const count = () => model.countDocuments();

  const findById = (id) => model.findById(id);

  const update = (id, data) => model.findByIdAndUpdate(id, data, { new: true, runValidators: true });

  const deleteById = (id) => model.findByIdAndDelete(id);

  return {
    create,
    findAll,
    count,
    findById,
    update,
    delete: deleteById
  };
};

module.exports = createJobRepository;
