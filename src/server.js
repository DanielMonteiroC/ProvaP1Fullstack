const app = require('./app');
const connectMongo = require('./config/mongo');
const sequelize = require('./config/mysql');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // 1. Inicializar Bases de Dados
    await connectMongo();
    await sequelize.sync(); 
    console.log('Bases de dados sincronizadas.');

    // 2. Subir o Servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Sénior a correr na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Falha crítica ao iniciar o servidor:', error);
    process.exit(1); // Mata o processo se os bancos não ligarem
  }
};

startServer();