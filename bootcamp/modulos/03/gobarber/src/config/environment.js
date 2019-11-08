import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { APP_NAME, APP_URL, APP_PORT, APP_HOST } = process.env;

// export default {
//   APP_NAME: {APP_NAME},
//   APP_URL: {APP_URL},
//   APP_PORT: {APP_PORT},
//   APP_HOST: {APP_HOST},
// };
module.exports = {
  APP_NAME,
  APP_URL,
  APP_PORT,
  APP_HOST,
};
