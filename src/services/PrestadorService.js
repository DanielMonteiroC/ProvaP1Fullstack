const Prestador = require('../models/Prestador');

class PrestadorService {
  async criar(dados) {
    if (dados.fotos_portfolio && dados.fotos_portfolio.length > 5) {
      throw new Error("Não é possível cadastrar com mais de 5 fotos.");
    }
    return await Prestador.create(dados);
  }

  async adicionarFotoPortfolio(id, novaFotoUrl) {
    const prestador = await Prestador.findById(id);
    if (!prestador) throw new Error("Prestador não encontrado");

    if (prestador.fotos_portfolio.length >= 5) {
      throw new Error("Limite de 5 fotos atingido. Exclua uma antes de aceitar a nova.");
    }

    prestador.fotos_portfolio.push(novaFotoUrl);
    return await prestador.save();
  }

  async atualizarFotoPerfil(id, novaFotoUrl) {
    // A lógica de apagar a foto antiga do storage (ex: Firebase) entraria aqui.
    // No banco de dados, o update simples já sobrescreve a URL antiga.
    return await Prestador.findByIdAndUpdate(id, { foto_perfil: novaFotoUrl }, { new: true });
  }

  // Métodos de Listar, Buscar por ID e Deletar...
}

module.exports = new PrestadorService();