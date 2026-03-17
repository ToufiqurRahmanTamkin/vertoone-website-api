const { connectToDatabase, disconnectDatabase } = require('./connection');
const config = require('../config');
const logger = require('../utils/logger');
const { ROLES } = require('../utils/constants');
const createAuthRepository = require('../../modules/auths/auth.repository');

const seedSuperAdmin = async () => {
  await connectToDatabase();
  const authRepository = createAuthRepository();

  if (!config.admin.password) {
    throw new Error(
      'SUPER_ADMIN_PASSWORD environment variable is required to seed the super admin. Please set it in your .env file.'
    );
  }

  const existingAdmin = await authRepository.findByEmail(config.admin.email);

  if (existingAdmin) {
    logger.info('Super admin already exists');
    return;
  }

  await authRepository.create({
    email: config.admin.email,
    password: config.admin.password,
    role: ROLES.SUPER_ADMIN
  });

  logger.info('Super admin seeded successfully');
};

seedSuperAdmin()
  .catch((error) => {
    logger.error('Failed to seed super admin', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
