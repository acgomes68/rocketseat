require('dotenv').config({
    path: process.env.NODE_ENV === 'testing' ? '.env.testing' : '.env',
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_OPTS, API_PORT } = process.env;

mongoose.connect(
    `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}?${DB_OPTS}`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(API_PORT);
