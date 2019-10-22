import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddlewware from './app/middlewares/auth';

const routes = new Router();

// Public access routes

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.delete('/users/:id', UserController.delete);

// Sessions
routes.post('/sessions', SessionController.store);

// Restricted access routes
routes.use(authMiddlewware);

// Users
routes.put('/users', UserController.update);

export default routes;
