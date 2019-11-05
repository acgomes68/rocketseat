require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_OPTS, APP_URL, APP_PORT, APP_HOST } = process.env;

module.exports = {
    DB_USERNAME, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_OPTS, 
    APP_URL,
    APP_PORT,
    APP_HOST
};

