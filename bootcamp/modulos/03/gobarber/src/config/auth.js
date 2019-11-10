import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { AUTH_SECRET, AUTH_EXPIRESIN } = process.env;

export default {
  secret: AUTH_SECRET,
  expiresIn: AUTH_EXPIRESIN,
};
