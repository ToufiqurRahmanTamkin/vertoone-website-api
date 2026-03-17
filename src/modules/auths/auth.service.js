const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../shared/config');
const createAppError = require('../../shared/utils/app-error');
const { toUserResponse } = require('./auth.dto');

const createAuthService = ({ authRepository }) => {
  const login = async (payload) => {
    const { email, password } = payload;

    const user = await authRepository.findByEmail(email, true);

    if (!user) {
      throw createAppError('Invalid email or password', 401);
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      throw createAppError('Invalid email or password', 401);
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    return {
      token,
      user: toUserResponse(user)
    };
  };

  const createUser = async (payload) => {
    const existingUser = await authRepository.findByEmail(payload.email);

    if (existingUser) {
      throw createAppError('Email already in use', 409);
    }

    const user = await authRepository.create(payload);
    return toUserResponse(user);
  };

  const listUsers = async (pagination) => {
    const [users, total] = await Promise.all([
      authRepository.findAll(pagination),
      authRepository.count()
    ]);

    return {
      users: users.map(toUserResponse),
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  };

  const getProfile = async (userId) => {
    const user = await authRepository.findById(userId);

    if (!user) {
      throw createAppError('User not found', 404);
    }

    return toUserResponse(user);
  };

  return {
    login,
    createUser,
    listUsers,
    getProfile
  };
};

module.exports = createAuthService;
