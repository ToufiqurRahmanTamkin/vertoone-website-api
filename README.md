# vertoone--website-api

Production-ready backend API for the Vertoone website built with Node.js, Express, and MongoDB.

## ✅ Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment template and update values:
   ```bash
   cp .env.example .env
   ```
   Ensure `JWT_SECRET` is set before running the API.
3. Seed the default SUPER_ADMIN user:
   ```bash
   npm run seed
   ```
4. Start the API:
   ```bash
   npm run dev
   ```

## 📧 Email Configuration Guide

The API supports SMTP and SendGrid via `nodemailer`.

### SMTP
Set in `.env`:
```
EMAIL_PROVIDER=smtp
EMAIL_FROM=no-reply@vertoone.com
SMTP_HOST=smtp.yourhost.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-user
SMTP_PASS=your-pass
```

### SendGrid
Set in `.env`:
```
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-sendgrid-api-key
EMAIL_FROM=no-reply@vertoone.com
```

> Optional admin notifications for contact submissions:
```
ADMIN_NOTIFICATION_EMAIL=admin@vertoone.com
```

## 🧪 Tests
Run the test suite (Jest + Supertest):
```bash
npm test
```

## 🧭 Swagger Documentation
Swagger UI is available at:
```
http://localhost:3000/api-docs
```

## 🚀 Local Run Steps
```bash
npm install
npm run seed
npm run dev
```

## ☁️ Vercel Deployment Steps
1. Ensure `vercel.json` is present (already included).
2. Set environment variables in the Vercel dashboard (same as `.env`).
3. Deploy with:
   ```bash
   vercel --prod
   ```

## 🔐 Default SUPER_ADMIN
The seed script uses credentials from environment variables. For local defaults, see `.env.example`, and **always** change them before production use.

Update these credentials using environment variables:
```
SUPER_ADMIN_EMAIL=admin@vertoone.com
SUPER_ADMIN_PASSWORD=your-secure-password
```
