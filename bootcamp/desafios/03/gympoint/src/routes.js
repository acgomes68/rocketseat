import { Router } from 'express';

import UserController from './app/controllers/UserController';
import StudentController from './app/controllers/StudentController';
import SessionController from './app/controllers/SessionController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';

import authMiddlewware from './app/middlewares/auth';

const routes = new Router();

/*------------------------------------------------------------------*/

// Public access routes (no required admin authentication)

// Sessions
routes.post('/sessions', SessionController.store);

// Students Checkins
routes.get('/students/:id/checkins', CheckinController.show);
routes.post('/students/:id/checkins', CheckinController.store);

// Students Help Orders
routes.get('/students/help-orders/no-answer', HelpOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.show);
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

/*------------------------------------------------------------------*/

// Restricted access routes (required admin authentication)
routes.use(authMiddlewware);

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// Plans
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

// Registrations
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

// Help Orders
routes.get('/help-orders/noanswer', HelpOrderController.show);
routes.post('/help-orders/:id/answer', HelpOrderController.store);

/*------------------------------------------------------------------*/

export default routes;
