const express = require('express');

const routes = express.Router();

const response = require('../utility/response');

routes.use('/login', require('./login.routes'), response.default);

module.exports = routes;
