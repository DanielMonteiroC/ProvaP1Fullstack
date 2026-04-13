const express = require('express');
const userRoutes = require('./routes/index');
const carRoutes = require('./routes/carRoutes');
const logger = require('./middlewares/logger');

const app = express();

//Middleware que Intercepta o JSON
app.use(express.json());

//Middleware Global
app.use(logger);

//Rotas
app.use(userRoutes);

app.use(carRoutes);

module.exports = app;