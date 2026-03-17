process.env.JWT_SECRET = 'test-secret';
process.env.EMAIL_PROVIDER = 'smtp';
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test-user';
process.env.SMTP_PASS = 'test-pass';
process.env.EMAIL_FROM = 'no-reply@test.com';
process.env.ADMIN_NOTIFICATION_EMAIL = '';

const mockCreateContact = jest.fn();
const mockSendEmail = jest.fn().mockResolvedValue({ messageId: 'test-message' });

jest.mock('../src/modules/contacts/contact.repository', () =>
  jest.fn(() => ({
    create: mockCreateContact
  }))
);

jest.mock('../src/shared/services/email.service', () => ({
  sendEmail: mockSendEmail
}));

const request = require('supertest');
const app = require('../src/app');

describe('Contacts', () => {
  beforeEach(() => {
    mockCreateContact.mockReset();
    mockSendEmail.mockReset();
  });

  it('should submit contact form and send confirmation email', async () => {
    mockCreateContact.mockResolvedValue({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      subject: 'Need help',
      message: 'Please contact me.'
    });

    const response = await request(app).post('/api/v1/contacts').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      subject: 'Need help',
      message: 'Please contact me.'
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('jane@example.com');
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });
});
