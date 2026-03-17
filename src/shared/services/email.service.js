const fs = require('fs/promises');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const Joi = require('joi');
const config = require('../config');
const logger = require('../utils/logger');

const templatesDir = path.join(__dirname, '..', 'templates');

const emailSchema = Joi.alternatives().try(
  Joi.string().email({ tlds: { allow: false } }),
  Joi.array().items(Joi.string().email({ tlds: { allow: false } })).min(1)
);

const isValidEmail = (value) => !emailSchema.validate(value).error;

const createTransporter = (emailConfig) => {
  if (emailConfig.host) {
    return nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
      }
    });
  }

  return nodemailer.createTransport({
    service: emailConfig.service || 'gmail',
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass
    }
  });
};

const getConfigError = (emailConfig) => {
  if (!emailConfig.user || !emailConfig.pass) {
    return new Error('EMAIL_USER and EMAIL_PASS must be configured');
  }

  return null;
};

const renderTemplate = async (templateName, context = {}) => {
  const templatePath = path.join(templatesDir, templateName);
  const templateContent = await fs.readFile(templatePath, 'utf8');
  const template = handlebars.compile(templateContent);
  return template(context);
};

const createEmailService = (emailConfig = {}) => {
  const configError = getConfigError(emailConfig);
  const transporter = configError ? null : createTransporter(emailConfig);

  const sendEmail = async ({ to, subject, template, context, html, text }) => {
    if (configError) {
      logger.error(configError.message);
      return { success: false, error: configError };
    }

    if (!isValidEmail(to)) {
      const error = new Error('Invalid recipient email address');
      logger.error(error.message, { to });
      return { success: false, error };
    }

    try {
      const renderedHtml = template ? await renderTemplate(template, context) : html;
      const mailOptions = {
        from: emailConfig.from,
        to,
        subject,
        html: renderedHtml,
        text
      };

      const info = await transporter.sendMail(mailOptions);
      logger.info('Email sent: %s', info.messageId);
      return { ...info, success: true };
    } catch (error) {
      logger.error('Failed to send email', { error });
      return { success: false, error };
    }
  };

  return { sendEmail };
};

const emailService = createEmailService(config.email);

module.exports = {
  ...emailService,
  createEmailService
};
