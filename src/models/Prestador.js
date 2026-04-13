// src/models/Prestador.js
const mongoose = require('mongoose');

const PrestadorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  data_nascimento: { type: Date, required: true },
  cpf: { type: String, required: true, unique: true },
  profissao: { type: String, required: true },
  foto_perfil: { type: String }, // URL da imagem
  fotos_portfolio: { 
    type: [String], 
    validate: [arrayLimit, 'O limite máximo é de 5 fotos.']
  },
  sobre_mim: { type: String, maxlength: 1000 }
});

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Prestador', PrestadorSchema);