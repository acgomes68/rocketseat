import axios from 'axios';

require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const { REACT_APP_API_URL, REACT_APP_API_PORT } = process.env;

const api = axios.create({
    baseURL: `${REACT_APP_API_URL}:${REACT_APP_API_PORT}`,
})

export default api;