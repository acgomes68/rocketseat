import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { MAIL_HOST, MAIL_PORT, MAIL_AUTH_USER, MAIL_AUTH_PASS } = process.env;

export default {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false,
  auth: {
    user: MAIL_AUTH_USER,
    pass: MAIL_AUTH_PASS,
  },
  default: {
    from: 'GoBarber Team <noreply@gobarber.com>',
  },
};
