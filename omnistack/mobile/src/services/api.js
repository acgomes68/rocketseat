import axios from 'axios';
import config from '../../config';

const api = axios.create({
    baseURL: 'http://192.168.0.51:3333',
    baseURL: `${config.API_URL}:${config.API_PORT}`,
});

export default api;