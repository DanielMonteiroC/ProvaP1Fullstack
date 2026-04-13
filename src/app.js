const express = require('express');
const logger = require('./middlewares/logger');
const prestadorRoutes = require('./routes/prestadorRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

// Middlewares globais
app.use(express.json());
app.use(logger); // Aplicamos o nosso novo logger globalmente

// Registo de Rotas
app.use('/prestadores', prestadorRoutes);
app.use('/clientes', clienteRoutes);

// Middleware global de tratamento de erros não capturados (Safety net)
app.use((err, req, res, next) => {
  console.error("Erro interno:", err.stack);
  res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
});

module.exports = app;