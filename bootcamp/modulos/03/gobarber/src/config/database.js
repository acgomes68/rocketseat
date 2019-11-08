require('dotenv').config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWD,
  POSTGRES_DATABASE,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
} = process.env;

module.exports = {
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
  mongo: {
    host: MONGO_HOST,
    port: MONGO_PORT,
    database: MONGO_DATABASE,
  },
};
