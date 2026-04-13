const express = require('express');
const connectMongo = require('./config/mongo');
const sequelize = require('./config/mysql');

const app = express();
app.use(express.json());

// Importação das rotas (exemplo)
// app.use('/clientes', require('./routes/clienteRoutes'));
// app.use('/prestadores', require('./routes/prestadorRoutes'));

const startServer = async () => {
  await connectMongo();
  await sequelize.sync(); // Cria as tabelas do MySQL se não existirem
  
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
};

startServer();