import 'dotenv/config';

import app from './app';

app.listen(process.env.APP_PORT, process.env.APP_HOST);
