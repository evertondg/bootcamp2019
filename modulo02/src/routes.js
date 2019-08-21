import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello World VERTAO' }));

// Sintaxe node
// module.exports = routes;

// sintaxe do 'sucrase' import export javascript novo
export default routes;
