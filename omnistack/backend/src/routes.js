const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');

const routes = express.Router();
const upload = multer(uploadConfig);

// Home
routes.get('/', (req, res) => {
    return res.json({
                    "message": "Aqui vai ser o body da index",
                });
});

// Users
routes.get('/users', SessionController.index);
routes.post('/users', SessionController.store);
routes.put('/users/:id', SessionController.update);
routes.delete('/users/:id', SessionController.destroy);

// Spots
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

module.exports = routes;