// src/models/Cliente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/mysql');

const Cliente = sequelize.define('Cliente', {
  nome: { type: DataTypes.STRING, allowNull: false },
  data_nascimento: { type: DataTypes.DATEONLY, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
  foto_perfil: { type: DataTypes.STRING, allowNull: true }, // URL da imagem
  sobre_mim: { 
    type: DataTypes.STRING(1000), 
    validate: { len: [0, 1000] } 
  }
});

module.exports = Cliente;