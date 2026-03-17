const fs = require('fs/promises');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const config = require('../config');
const logger = require('../utils/logger');

const templatesDir = path.join(__dirname, '..', 'templates');

const createTransporter = () => {
  if (config.email.provider === 'sendgrid') {
    if (!config.email.sendgridApiKey) {
      throw new Error('SENDGRID_API_KEY is not configured');
    }

    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: config.email.sendgridApiKey
      }
    });
  }

  const { host, port, secure, user, pass } = config.email.smtp;

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is incomplete');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass
    }
  });
};


const renderTemplate = async (templateName, context = {}) => {
  const templatePath = path.join(templatesDir, templateName);
  const templateContent = await fs.readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateContent);
  return template(context);
};

const sendEmail = async ({ to, subject, template, context, html, text }) => {
  const renderedHtml = template ? await renderTemplate(template, context) : html;

  const transporter = createTransporter();
  const mailOptions = {
    from: config.email.from,
    to,
    subject,
    html: renderedHtml,
    text
  };

  const info = await transporter.sendMail(mailOptions);
  logger.info('Email sent: %s', info.messageId);
  return info;
};

module.exports = {
  sendEmail
};
