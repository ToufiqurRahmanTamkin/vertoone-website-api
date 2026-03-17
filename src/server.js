const app = require('./app');
const config = require('./shared/config');
const { connectToDatabase } = require('./shared/database/connection');
const logger = require('./shared/utils/logger');

connectToDatabase().catch((error) => {
  logger.error('Failed to connect to MongoDB', error);
});

if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    logger.info('Server running on port %s', config.port);
  });
}

module.exports = app;
