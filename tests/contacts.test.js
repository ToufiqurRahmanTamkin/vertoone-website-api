process.env.JWT_SECRET = 'test-secret';
process.env.EMAIL_SERVICE = 'gmail';
process.env.EMAIL_USER = 'test-user';
process.env.EMAIL_PASS = 'test-pass';
process.env.EMAIL_FROM = 'no-reply@test.com';
process.env.ADMIN_NOTIFICATION_EMAIL = '';

const mockCreateContact = jest.fn();
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message' });
const mockCreateTransport = jest.fn(() => ({
  sendMail: mockSendMail
}));

jest.mock('../src/modules/contacts/contact.repository', () =>
  jest.fn(() => ({
    create: mockCreateContact
  }))
);

jest.mock('nodemailer', () => ({
  createTransport: mockCreateTransport
}));

const request = require('supertest');
const app = require('../src/app');

describe('Contacts', () => {
  beforeEach(() => {
    mockCreateContact.mockClear();
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();
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
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });
});
