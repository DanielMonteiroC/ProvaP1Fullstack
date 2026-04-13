const Cliente = require('../models/Cliente');

class ClienteService {
  async criar(dados) {
    return await Cliente.create(dados);
  }

  async atualizarFotoPerfil(id, novaFotoUrl) {
    // Atualização simples que sobrescreve o valor anterior
    await Cliente.update({ foto_perfil: novaFotoUrl }, { where: { id } });
    return await Cliente.findByPk(id);
  }

  // Métodos de Listar, Buscar por ID e Deletar...
}

module.exports = new ClienteService();