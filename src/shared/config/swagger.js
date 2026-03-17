const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vertoone Website API',
      version: '1.0.0',
      description: 'Backend API for Vertoone website.'
    },
    servers: [
      {
        url: '/'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        AuthLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' }
          }
        },
        UserCreate: {
          type: 'object',
          required: ['email', 'password', 'role'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string', format: 'password' },
            role: { type: 'string', enum: ['SUPER_ADMIN', 'USER'] }
          }
        },
        Blog: {
          type: 'object',
          required: ['title', 'content', 'author'],
          properties: {
            title: { type: 'string' },
            content: { type: 'string' },
            author: { type: 'string' },
            tags: { type: 'array', items: { type: 'string' } },
            publishedAt: { type: 'string', format: 'date-time' }
          }
        },
        Job: {
          type: 'object',
          required: ['title', 'description', 'location', 'type'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            location: { type: 'string' },
            type: { type: 'string' },
            salary: { type: 'string' }
          }
        },
        Contact: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'subject', 'message'],
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            subject: { type: 'string' },
            message: { type: 'string' }
          }
        },
        NewsletterSubscription: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string', format: 'email' }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, '../../modules/**/*.routes.js')]
};

module.exports = swaggerJSDoc(options);
