require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { APP_NAME, APP_URL, APP_PORT, APP_HOST } = process.env;

module.exports = {
    APP_NAME, 
    APP_URL,
    APP_PORT,
    APP_HOST
};

