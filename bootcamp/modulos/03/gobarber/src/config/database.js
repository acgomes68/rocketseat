require('dotenv').config({
  path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { DB_HOST, DB_USER, DB_PASSWD, DB_DATABASE } = process.env;

module.exports = {
  dialect: 'postgres',
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWD,
  database: DB_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
