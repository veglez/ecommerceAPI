import dotenv from 'dotenv';

dotenv.config();

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8000,
  mongoURL: process.env.MONGO_URL || `mongodb://mongo_db:27017/store`,
  jwtAccess: process.env.JWT_ACCESS,
  jwtRefresh: process.env.JWT_REFRESH,
  jwtRecovery: process.env.JWT_RECOVERY,
  cookies: process.env.COOKIES_SIGN,
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  refreshCookieName: 'TINAT',
};

config['baseURL'] = `http://localhost:${config.port}/api/v1`;

export default config;
