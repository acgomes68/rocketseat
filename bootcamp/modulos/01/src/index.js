const express = require('express');

const config = require('./config')

const server = express();

server.use(express.json());

// Query params: ?name=John
// Route params: /users/1
// Request body: { "name": "John" }

//  C               R           U           D
//  Create (POST)   Read(GET)   Update(PUT) Delete

const users = ['Antonio', 'Jorge', 'Eduardo'];

server.use((req, res, next) => {
    console.time('Request');

    console.log(`Método: ${req.method}; URL: ${req.url}`);
    next();

    console.timeEnd('Request');
});

checkUserNameExists = function(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'User name is required' });
    }

    return next();
};

checkUserIdExists = function(req, res, next) {
    const user = users[req.params.index];

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    req.user = user;

    return next();
};

// http://localhost:3000/users
server.get('/users', (req, res) => {
    return res.json(users);
});

// http://localhost:3000/users/1
server.get('/users/:index', checkUserIdExists, (req, res) => {
    return res.json(req.user);
});

// POST http://localhost:3000/users HTTP/1.1
// content-type: application/json
// {
//     "name": "Robson",
// }
server.post('/users', checkUserNameExists, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

// PUT http://localhost:3000/users/1 HTTP/1.1
// content-type: application/json
// {
//     "name": "Luís",
// }
server.put('/users/:index', checkUserIdExists, checkUserNameExists, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

// DELETE http://localhost:3000/users/1 HTTP/1.1
server.delete('/users/:index', checkUserIdExists, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.json(users);
});

// http://localhost:3000/
server.listen(config.APP_PORT, config.APP_HOST);