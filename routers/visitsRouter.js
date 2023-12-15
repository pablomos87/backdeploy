const express = require('express');
const visitsRouter = express.Router();
const { visitsCounter } = require('../dao/controllers/visitsController');

visitsRouter.get('/count', visitsCounter);

module.exports = visitsRouter;