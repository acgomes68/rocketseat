const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-57ukh.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json());
app.use(routes);

app.listen(3333);
