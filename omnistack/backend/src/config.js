require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_OPTS, API_URL, API_PORT } = process.env;

module.exports = {
    DB_USERNAME, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_OPTS, 
    API_URL,
    API_PORT
};

