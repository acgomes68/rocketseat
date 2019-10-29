import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

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

// Upload
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;
