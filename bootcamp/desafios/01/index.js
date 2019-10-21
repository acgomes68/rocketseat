const express = require('express');

const server = express();

server.use(express.json());

const projects = [
    {
        id: "1",
        title: "Exemplo de projeto",
        tasks: [
            'Exemplo de tarefa',
        ],
    },
];

const requisicoes = {
    "GET": 0,
    "POST": 0,
    "PUT": 0,
    "DELETE": 0,
};

server.use((req, res, next) => {
    const http_method = req.method;
    let total_requisicoes = 0;

    console.time('Request');

    switch (http_method) {
        case 'GET':
            requisicoes.GET += 1;
            break;
        case 'POST':
            requisicoes.POST += 1;
            break;
        case 'PUT':
            requisicoes.PUT += 1;
            break;
        case 'DELETE':
            requisicoes.DELETE += 1;
            break;
    }

    total_requisicoes = requisicoes.GET + requisicoes.POST + requisicoes.PUT + requisicoes.DELETE;

    console.log(`Método: ${req.method}; URL: ${req.url};`);
    next();

    console.timeEnd('Request');
    console.log('Requisições GET: ', requisicoes.GET);
    console.log('Requisições POST: ', requisicoes.POST);
    console.log('Requisições PUT: ', requisicoes.PUT);
    console.log('Requisições DELETE: ', requisicoes.DELETE);
    console.log('Total de requisições : ', total_requisicoes);
});

getValueByKey = (object, value) => { 
    return Object.keys(object).find(index =>  
            object[index].id == value);
};

checkProjectIdExists = (req, res, next) => {
    const project_id = req.params.id;
    const index = getValueByKey(projects, project_id);

    if (index == undefined) {
        return res.status(400).json({ error: 'Project not found' });
    }

    req.index = index;

    return next();
};

checkProjectIdNotExists = (req, res, next) => {
    const project_id = req.body.id;
    const index = getValueByKey(projects, project_id);

    if (!project_id) {
        return res.status(400).json({ error: 'Project id is required' });
    }
    else if (index != undefined) {
        return res.status(400).json({ error: 'Project already exists' });
    }

    return next();
};

checkProjectTitleExists = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).json({ error: 'Project title is required' });
    }

    return next();
};

checkProjectTaskTitleExists = (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).json({ error: 'Project task title is required' });
    }

    return next();
};

server.get('/projects', (req, res) => {
    return res.json(projects);
});

server.get('/projects/:id', checkProjectIdExists, (req, res) => {
    return res.json(projects[req.index]);
});

server.post('/projects', checkProjectIdNotExists, checkProjectTitleExists, (req, res) => {
    const { id } = req.body;
    const { title } = req.body;
    const tasks = [];
    const project = { "id":  id, "title": title, "tasks": tasks };
    
    projects.push(project);

    return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectIdExists, checkProjectTaskTitleExists, (req, res) => {
    const { title } = req.body;
    
    projects[req.index].tasks.push(title);

    return res.json(projects);
});

server.put('/projects/:id', checkProjectIdExists, checkProjectTitleExists, (req, res) => {
    const { title } = req.body;

    projects[req.index].title = title;

    return res.json(projects);
});

server.delete('/projects/:id', checkProjectIdExists, (req, res) => {
    console.log('req.index: ', req.index);

    projects.splice(req.index, 1);

    return res.json(projects);
});

server.listen(3000);