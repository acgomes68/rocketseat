import axios from 'axios';

import config from '../config';

const api = axios.create({
    baseURL: `${config.REACT_APP_API_URL}:${config.REACT_APP_API_PORT}`,
})

export default api;