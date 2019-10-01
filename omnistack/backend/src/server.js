const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.json({message: "Hello brave new world"});
});

app.post('/users', (req, res) => {
    return res.json({user: req.post.user});
});

app.get('/contacts', (req, res) => {
    return res.json({contact: req.query.contact});
});

app.listen(3333);