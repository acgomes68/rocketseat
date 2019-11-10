import 'dotenv/config';

import app from './app';

const { APP_HOST, APP_PORT } = process.env;

app.listen(APP_PORT, APP_HOST);
