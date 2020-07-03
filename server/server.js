/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = 3000;

// Auth

const username = 'admin';
const password = 'pass';
const token = 't' + Math.random().toString();

function isUrlAuthorized(request) {
    return request.url === '/login' || request.header('token') === token;
}

// Server stuff

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (isUrlAuthorized(req)) {
        next();
    } else {
        res.sendStatus(401);
    }
});

server.post('/login', (req, res) => {
    const data = req.body || {};

    if (data.username === username &&
        data.password === password) {
        
        res.send(JSON.stringify(token));
    } else {
        res.sendStatus(500);
    }
});

server.use(router);

server.listen(port, () => {
    console.log('JSON Server is running');
});
