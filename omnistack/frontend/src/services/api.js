import axios from 'axios';

require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});

const api = axios.create({
    // baseURL: `http://${API_URL}:${API_PORT}`,
    baseURL: `http://192.168.0.50:3333`,
})

export default api;