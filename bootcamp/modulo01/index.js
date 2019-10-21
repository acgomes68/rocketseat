const express = require('express');

const server = express();

server.use(express.json());

// Query params: ?name=John
// Route params: /users/1
// Request body: { "name": "John" }

//  C               R           U           D
//  Create (POST)   Read(GET)   Update(PUT) Delete

// http://localhost:3000/teste?name=Gomes
server.get('/teste', (req, res) => {
    const name = req.query.name;

    return res.json({ 'message': `Hello ${name}!` });
});

// http://localhost:3000/users/2
// server.get('/users/:id', (req, res) => {
//     const { id } = req.params;

//     return res.json({
//             "id": `${id}`,
//             "name": "Antonio Gomes",
//             "email": "antonio.gomes@email.com",
//             "tech": ["ReactJS", "NodeJS", "React Native"],
//     });
// });

const users = ['Antonio', 'Jorge', 'Eduardo'];

// http://localhost:3000/users
server.get('/users', (req, res) => {
    return res.json(users);
});

// http://localhost:3000/users/1
server.get('/users/:index', (req, res) => {
    const { index } = req.params;

    return res.json(users[index]);
});

// POST http://localhost:3000/users HTTP/1.1
// content-type: application/json
// {
//     "name": "Robson",
// }
server.post('/users', (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

// PUT http://localhost:3000/users/1 HTTP/1.1
// content-type: application/json
// {
//     "name": "Luís",
// }
server.put('/users/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
});

// DELETE http://localhost:3000/users/1 HTTP/1.1
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;

    users.splice(index);

    return res.json(users);
});

// http://localhost:3000/
server.listen(3000);