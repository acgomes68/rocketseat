const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');
const config = require('./config');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const connectedUsers = {};

io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

mongoose.connect(
    `mongodb+srv://${config.DB_USERNAME}:${config.DB_PASSWORD}@${config.DB_HOST}?${config.DB_OPTS}`,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
);

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(config.APP_PORT, config.APP_HOST);
