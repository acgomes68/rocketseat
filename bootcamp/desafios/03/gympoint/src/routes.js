import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddlewware from './app/middlewares/auth';

const routes = new Router();

// Public access routes

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Sessions
routes.post('/sessions', SessionController.store);

// Restricted access routes
routes.use(authMiddlewware);

// Users
routes.put('/users', UserController.update);

export default routes;
