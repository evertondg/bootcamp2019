import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello2 World' });
});

export default routes;
