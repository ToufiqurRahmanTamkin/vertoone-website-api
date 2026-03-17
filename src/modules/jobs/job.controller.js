const createJobRepository = require('./job.repository');
const createJobService = require('./job.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');
const { getPagination } = require('../../shared/utils/pagination');

const jobRepository = createJobRepository();
const jobService = createJobService({ jobRepository });

const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'Job created successfully',
    data: job
  });
});

const listJobs = asyncHandler(async (req, res) => {
  const pagination = getPagination(req.query);
  const { jobs, meta } = await jobService.listJobs(pagination);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Jobs fetched successfully',
    data: jobs,
    meta
  });
});

const getJob = asyncHandler(async (req, res) => {
  const job = await jobService.getJob(req.params.id);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Job fetched successfully',
    data: job
  });
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(req.params.id, req.body);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Job updated successfully',
    data: job
  });
});

const deleteJob = asyncHandler(async (req, res) => {
  const job = await jobService.deleteJob(req.params.id);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Job deleted successfully',
    data: job
  });
});

module.exports = {
  createJob,
  listJobs,
  getJob,
  updateJob,
  deleteJob
};
