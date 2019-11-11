import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWD,
  POSTGRES_DATABASE,
} = process.env;

export default {
  postgres: {
    dialect: 'postgres',
    host: POSTGRES_HOST,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWD,
    database: POSTGRES_DATABASE,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
  },
};
