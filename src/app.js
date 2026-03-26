const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const config = require('./shared/config');
const rateLimiter = require('./shared/middlewares/rate-limit.middleware');
const sanitizeMiddleware = require('./shared/middlewares/sanitize.middleware');
const errorHandler = require('./shared/middlewares/error.middleware');
const dbConnectMiddleware = require('./shared/middlewares/db-connect.middleware');
const logger = require('./shared/utils/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./shared/config/swagger');

const authRoutes = require('./modules/auths/auth.routes');
const blogRoutes = require('./modules/blogs/blog.routes');
const contactRoutes = require('./modules/contacts/contact.routes');
const jobRoutes = require('./modules/jobs/job.routes');
const newsletterRoutes = require('./modules/newsletters/newsletter.routes');

const app = express();

app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true
  })
);
app.use(rateLimiter);
app.use(express.json({ limit: '1mb' }));
app.use(mongoSanitize());
app.use(sanitizeMiddleware);
// Ensure DB connection for all routes (Vercel optimization)
app.use(dbConnectMiddleware);


app.use((req, _res, next) => {
  logger.info('%s %s', req.method, req.originalUrl);
  next();
});

app.get('/', (_req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Vertoone Website API is running',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js'
  ],
  customSiteTitle: 'Vertoone API Docs'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));

app.use('/api/v1/auths', authRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/newsletters', newsletterRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

app.use(errorHandler);

module.exports = app;
