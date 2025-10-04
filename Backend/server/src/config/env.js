import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/expense_manager',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  ocrEnabled: (process.env.OCR_ENABLED || 'false').toLowerCase() === 'true',
};
