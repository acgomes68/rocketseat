import axios from 'axios';
import config from '../config';

const api = axios.create({
    baseURL: `${config.API_URL}:${config.API_PORT}`,
});

export default api;