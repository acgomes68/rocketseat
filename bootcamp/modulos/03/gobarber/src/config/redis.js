import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { REDIS_HOST, REDIS_PORT } = process.env;

export default {
  host: REDIS_HOST,
  port: REDIS_PORT,
};
