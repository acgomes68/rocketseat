import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { SENTRY_DSN } = process.env;

export default {
  dsn: SENTRY_DSN,
};
