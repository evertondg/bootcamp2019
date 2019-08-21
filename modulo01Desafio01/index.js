const express = require('express');
const server = express();
server.use(express.json());
// ROUTES

const projects = [
  {
    id: '0',
    title: 'Novo projeto0',
    tasks: []
  },
  {
    id: '1',
    title: 'Novo projeto1',
    tasks: []
  },
  {
    id: '2',
    title: 'Novo projeto2',
    tasks: []
  },
  {
    id: '3',
    title: 'Novo projeto3',
    tasks: []
  }
];

let contaRequisicoes = 0;

// Middleware Global

server.use((req, res, next) => {
  contaRequisicoes++;
  console.log(`Foram feitas ${contaRequisicoes} requisições até o momento`);
  next();
});

function verificaExistenciaProjeto(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ message: 'Projeto inexistente' });
  }

  next();
}

// const tasks = [];

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.get('/projects/:id', verificaExistenciaProjeto, (req, res) => {
  const { id } = req.params;
  const project = projects[id];
  return res.json({ project });
});

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  const project = { id, title, tasks };

  projects.push(project);
  return res.json(projects);
});

server.put('/projects/:id', verificaExistenciaProjeto, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  projects[id].title = title;

  return res.json(projects);
});

server.delete('/projects/:id', verificaExistenciaProjeto, (req, res) => {
  const { id } = req.params;

  projects.splice(id, 1);
  return res.send();
});

server.post('/projects/:id/tasks', verificaExistenciaProjeto, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);
