process.env.JWT_SECRET = 'test-secret';
process.env.EMAIL_PROVIDER = 'smtp';
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_SECURE = 'false';
process.env.SMTP_USER = 'test-user';
process.env.SMTP_PASS = 'test-pass';
process.env.EMAIL_FROM = 'no-reply@test.com';

const mockFindByEmail = jest.fn();

jest.mock('../src/modules/auths/auth.repository', () =>
  jest.fn(() => ({
    findByEmail: mockFindByEmail,
    findById: jest.fn(),
    findAll: jest.fn(),
    count: jest.fn(),
    create: jest.fn()
  }))
);

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');

describe('Auth login', () => {
  beforeEach(() => {
    mockFindByEmail.mockReset();
  });

  it('should login with valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('Password123!', 10);
    const user = {
      id: 'user-id',
      email: 'user@example.com',
      role: 'USER',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockFindByEmail.mockResolvedValue(user);

    const response = await request(app).post('/api/v1/auths/login').send({
      email: 'user@example.com',
      password: 'Password123!'
    });

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user.email).toBe('user@example.com');
    expect(mockFindByEmail).toHaveBeenCalledWith('user@example.com', true);
  });
});
