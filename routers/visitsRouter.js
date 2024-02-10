const express = require('express');
const visitsRouter = express.Router();
const { visitsCounter } = require('../dao/controllers/visitsController');

visitsRouter.get('/count', authenticateAdminToken, visitsCounter);

module.exports = visitsRouter;