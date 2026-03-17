const createAppError = require('../../shared/utils/app-error');

const createJobService = ({ jobRepository }) => {
  const createJob = async (payload) => jobRepository.create(payload);

  const listJobs = async (pagination) => {
    const [jobs, total] = await Promise.all([
      jobRepository.findAll(pagination),
      jobRepository.count()
    ]);

    return {
      jobs,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  };

  const getJob = async (id) => {
    const job = await jobRepository.findById(id);

    if (!job) {
      throw createAppError('Job not found', 404);
    }

    return job;
  };

  const updateJob = async (id, payload) => {
    const job = await jobRepository.update(id, payload);

    if (!job) {
      throw createAppError('Job not found', 404);
    }

    return job;
  };

  const deleteJob = async (id) => {
    const job = await jobRepository.delete(id);

    if (!job) {
      throw createAppError('Job not found', 404);
    }

    return job;
  };

  return {
    createJob,
    listJobs,
    getJob,
    updateJob,
    deleteJob
  };
};

module.exports = createJobService;
