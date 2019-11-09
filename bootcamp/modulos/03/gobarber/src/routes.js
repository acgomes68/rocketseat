import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import authMiddlewware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/*----------------------------------------------------------------------*/
// Public access routes

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);

// Sessions
routes.post('/sessions', SessionController.store);

/*----------------------------------------------------------------------*/
// Restricted access routes
routes.use(authMiddlewware);

// Users
routes.put('/users', UserController.update);

// Providers
routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

// Appointments
routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

// Schedules
routes.get('/schedules', ScheduleController.index);
routes.post('/schedules', ScheduleController.store);

// Notifications
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Upload
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
