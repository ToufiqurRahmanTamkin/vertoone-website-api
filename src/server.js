const app = require('./app');
const config = require('./shared/config');
const { connectToDatabase } = require('./shared/database/connection');
const logger = require('./shared/utils/logger');

const dns = require('dns');

const configureNodeDns = () => {
  const dnsServers = process.env.DNS_SERVERS;

  if (dnsServers) {
    const servers = dnsServers
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean);

    if (servers.length > 0) {
      dns.setServers(servers);
      logger.info('Node DNS servers overridden: %s', servers.join(', '));
      return;
    }
  }

  const currentServers = dns.getServers();
  const onlyLocalhostDns =
    currentServers.length === 1 &&
    (currentServers[0] === '127.0.0.1' || currentServers[0] === '::1');

  if (onlyLocalhostDns) {
    logger.warn(
      'Node is configured to use localhost DNS (%s). If no local DNS proxy is running, MongoDB Atlas SRV lookups will fail. Fix your network DNS settings or set DNS_SERVERS (e.g. "8.8.8.8,1.1.1.1").',
      currentServers[0]
    );

    const isProd = String(process.env.NODE_ENV || '').toLowerCase() === 'production';
    if (!isProd) {
      const fallbackServers = ['1.1.1.1', '8.8.8.8'];
      dns.setServers(fallbackServers);
      logger.info('Node DNS fallback applied: %s', fallbackServers.join(', '));
    }
  }
};

configureNodeDns();

connectToDatabase().catch((error) => {
  logger.error('Failed to connect to MongoDB', error);
});

if (!process.env.VERCEL) {
  const server = app.listen(config.port, () => {
    logger.info('Server running on port %s', config.port);
  });

  server.on('error', (error) => {
    logger.error('Failed to start server', error);
    process.exit(1);
  });
}

module.exports = app;
