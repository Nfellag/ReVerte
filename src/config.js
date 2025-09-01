require('dotenv').config();

const config = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'dev',

  pg: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
    database: process.env.PGDATABASE || 'reverte',
    user: process.env.PGUSER || 'reverte_user',
    password: process.env.PGPASSWORD || 'password',
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
  },

  jwtSecret: process.env.JWT_SECRET || 'change_me_please',
  apiIngestKey: process.env.API_INGEST_KEY || 'ingest_key',

  alerts: {
    tempThresholdC: process.env.ALERT_TEMP_THRESHOLD_C ? Number(process.env.ALERT_TEMP_THRESHOLD_C) : 30,
    throttleMinutes: process.env.ALERT_THROTTLE_MINUTES ? Number(process.env.ALERT_THROTTLE_MINUTES) : 10,
  },

  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.ALERT_FROM_EMAIL || 'alerts@example.com',
    to: process.env.ALERT_TO_EMAIL || 'ong@example.com',
  },

  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID,
  },
};

module.exports = config;
