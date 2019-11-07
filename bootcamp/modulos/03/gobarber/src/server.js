import app from './app';

const config = require('./config/environment');

app.listen(config.APP_PORT, config.APP_HOST);
