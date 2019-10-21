const express = require('express');

const server = express();

// Query params: ?name=John
// Route params: /users/1
// Request body: { "name": "John" }

// http://localhost:3000/teste?name=Gomes
server.get('/teste', (req, res) => {
    const name = req.query.name;

    return res.json({ 'message': `Hello ${name}!` });
});

// http://localhost:3000/users/2
server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    return res.json({
            "id": `${id}`,
            "name": "Antonio Gomes",
            "email": "antonio.gomes@email.com",
            "tech": ["ReactJS", "NodeJS", "React Native"],
    });
});


// http://localhost:3000/
server.listen(3000);