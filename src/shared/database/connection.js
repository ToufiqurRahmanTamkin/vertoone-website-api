const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../utils/logger');

mongoose.set('strictQuery', true);

let cached = { conn: null, promise: null };

const connectToDatabase = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  const mongoUri = process.env.MONGODB_URI || config.mongodbUri;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured');
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        maxPoolSize: 10
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  logger.info('MongoDB connected');
  return cached.conn;
};

const disconnectDatabase = async () => {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
  }
};

module.exports = {
  connectToDatabase,
  disconnectDatabase
};
