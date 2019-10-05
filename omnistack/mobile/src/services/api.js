require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

import axios from 'axios';

const { API_URL, API_PORT } = process.env;

const api = axios.create({
    baseURL: 'http://192.168.0.51:3333',
    // baseURL: `http://${API_URL}:${API_PORT}`,
});

export default api;