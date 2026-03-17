const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(process.cwd(), '.env');

dotenv.config({ path: envPath });

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) {
    return fallback;
  }
  return value === 'true' || value === true;
};

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  mongodbUri: process.env.MONGODB_URI,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  email: {
    from: process.env.EMAIL_FROM || 'no-reply@vertoone.com',
    service: process.env.EMAIL_SERVICE || 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
    secure: parseBoolean(process.env.EMAIL_SECURE, false),
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    adminNotificationEmail: process.env.ADMIN_NOTIFICATION_EMAIL
  },
  admin: {
    email: process.env.SUPER_ADMIN_EMAIL || 'admin@vertoone.com',
    password: process.env.SUPER_ADMIN_PASSWORD
  }
};

module.exports = config;
