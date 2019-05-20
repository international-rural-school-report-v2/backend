const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const authRt = require('./auth/router');
const publicRt = require('./public/router');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send("Welcome to the International Rural School Report API");
});

server.use('/auth', authRt);
server.use('/public', publicRt);

module.exports = server;
