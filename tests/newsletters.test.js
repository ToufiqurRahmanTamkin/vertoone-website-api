process.env.JWT_SECRET = 'test-secret';
process.env.EMAIL_SERVICE = 'gmail';
process.env.EMAIL_HOST = '';
process.env.EMAIL_PORT = '587';
process.env.EMAIL_SECURE = 'false';
process.env.EMAIL_USER = 'test-user';
process.env.EMAIL_PASS = 'test-pass';
process.env.EMAIL_FROM = 'no-reply@test.com';

const mockFindByEmail = jest.fn();
const mockCreateSubscription = jest.fn();
const mockSendMail = jest.fn().mockResolvedValue({ messageId: 'test-message' });
const mockCreateTransport = jest.fn(() => ({
  sendMail: mockSendMail
}));

jest.mock('../src/modules/newsletters/newsletter.repository', () =>
  jest.fn(() => ({
    findByEmail: mockFindByEmail,
    create: mockCreateSubscription
  }))
);

jest.mock('nodemailer', () => ({
  createTransport: mockCreateTransport
}));

const request = require('supertest');
const app = require('../src/app');

describe('Newsletters', () => {
  beforeEach(() => {
    mockFindByEmail.mockReset();
    mockCreateSubscription.mockReset();
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();
  });

  it('should subscribe and send welcome email', async () => {
    mockFindByEmail.mockResolvedValue(null);
    mockCreateSubscription.mockResolvedValue({
      email: 'subscriber@example.com'
    });

    const response = await request(app).post('/api/v1/newsletters/subscribe').send({
      email: 'subscriber@example.com'
    });

    expect(response.status).toBe(201);
    expect(response.body.data.email).toBe('subscriber@example.com');
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });
});
