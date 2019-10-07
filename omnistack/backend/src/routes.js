const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

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
routes.get('/users/:id', SessionController.show);
routes.post('/users', SessionController.store);
routes.put('/users/:id', SessionController.update);
routes.delete('/users/:id', SessionController.destroy);

// Spots
routes.get('/spots', SpotController.index);
routes.get('/spots/:id', SpotController.show);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.put('/spots/:id', upload.single('thumbnail'), SpotController.update);
routes.delete('/spots/:id', SpotController.destroy);

// Dashboard
routes.get('/dashboard', DashboardController.show);

// Booking
routes.get('/bookings', BookingController.index);
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.delete('/bookings/:id', BookingController.destroy);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);

module.exports = routes;