import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';

import authMiddlewware from './app/middlewares/auth';

const routes = new Router();

/*------------------------------------------------------------------*/

// Public access routes (no required admin authentication)

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);

// Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);

// Sessions
routes.post('/sessions', SessionController.store);

/*------------------------------------------------------------------*/

// Restricted access routes (required admin authentication)
routes.use(authMiddlewware);

// Users
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Students
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

/*------------------------------------------------------------------*/

export default routes;
