process.env.JWT_SECRET = 'test-secret';
process.env.EMAIL_PROVIDER = 'smtp';
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test-user';
process.env.SMTP_PASS = 'test-pass';
process.env.EMAIL_FROM = 'no-reply@test.com';

const mockFindByEmail = jest.fn();
const mockCreateSubscription = jest.fn();
const mockSendEmail = jest.fn().mockResolvedValue({ messageId: 'test-message' });

jest.mock('../src/modules/newsletters/newsletter.repository', () =>
  jest.fn(() => ({
    findByEmail: mockFindByEmail,
    create: mockCreateSubscription
  }))
);

jest.mock('../src/shared/services/email.service', () => ({
  sendEmail: mockSendEmail
}));

const request = require('supertest');
const app = require('../src/app');

describe('Newsletters', () => {
  beforeEach(() => {
    mockFindByEmail.mockReset();
    mockCreateSubscription.mockReset();
    mockSendEmail.mockReset();
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
    expect(mockSendEmail).toHaveBeenCalledTimes(1);
  });
});
