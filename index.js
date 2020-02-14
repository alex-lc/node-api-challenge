const express = require('express');

const projectsRouter = require('./data/projects/projectsRouter.js');
const server = express();

// middleware
server.use(express.json());
server.use('/api/projects', projectsRouter);

// endpoints
server.get('/', (req, res) => {
    res.status(200).json({ weAre: "working" });
})

const port = 4000;
server.listen(port, () => {
    console.log(`We're listening on port 4k.`);
})

module.exports = server;