import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.get('/:id', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.post('/', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.put('/:id', (req, res) => {
  return res.json({ hello: 'World' });
});

routes.delete('/:id', (req, res) => {
  return res.json({ hello: 'World' });
});

export default routes;
