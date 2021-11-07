const express    = require('express');
const cors       = require('cors');
const itemRouter = require('./items/items-router');

const server  = express();

server.use(cors());
server.use(express.json());
server.use('/api/items', itemRouter);

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack  : err.stack
    });
});

module.exports = server;