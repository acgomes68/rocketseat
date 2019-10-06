require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { REACT_APP_API_URL, REACT_APP_API_PORT } = process.env;

export default {
    REACT_APP_API_URL,
    REACT_APP_API_PORT,
};