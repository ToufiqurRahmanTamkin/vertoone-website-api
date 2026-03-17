const createAuthRepository = require('./auth.repository');
const createAuthService = require('./auth.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');
const { getPagination } = require('../../shared/utils/pagination');

const authRepository = createAuthRepository();
const authService = createAuthService({ authRepository });

const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Login successful',
    data
  });
});

const createUser = asyncHandler(async (req, res) => {
  const user = await authService.createUser(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'User created successfully',
    data: user
  });
});

const listUsers = asyncHandler(async (req, res) => {
  const pagination = getPagination(req.query);
  const { users, meta } = await authService.listUsers(pagination);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Users fetched successfully',
    data: users,
    meta
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getProfile(req.user.sub);

  return sendResponse(res, {
    statusCode: 200,
    message: 'Profile fetched successfully',
    data: user
  });
});

module.exports = {
  login,
  createUser,
  listUsers,
  getProfile
};
