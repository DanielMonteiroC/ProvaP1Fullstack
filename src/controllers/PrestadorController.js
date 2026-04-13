const PrestadorService = require('../services/PrestadorService');
const Prestador = require('../models/Prestador');

exports.criar = async (req, res) => {
  try {
    const prestador = await PrestadorService.criar(req.body);
    res.status(201).json(prestador);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const prestadores = await Prestador.find();
    res.status(200).json(prestadores);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const prestador = await Prestador.findById(req.params.id);
    if (!prestador) return res.status(404).json({ erro: 'Prestador não encontrado' });
    res.status(200).json(prestador);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const prestador = await Prestador.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!prestador) return res.status(404).json({ erro: 'Prestador não encontrado' });
    res.status(200).json(prestador);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const prestador = await Prestador.findByIdAndDelete(req.params.id);
    if (!prestador) return res.status(404).json({ erro: 'Prestador não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Rotas específicas de negócio (Fotos Portfólio)
exports.adicionarFoto = async (req, res) => {
  try {
    const { fotoUrl } = req.body;
    const atualizado = await PrestadorService.adicionarFotoPortfolio(req.params.id, fotoUrl);
    res.status(200).json(atualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.removerFoto = async (req, res) => {
  try {
    const { fotoUrl } = req.body;
    const prestador = await Prestador.findById(req.params.id);
    
    // Filtra a foto exata que o usuário quer excluir do array
    prestador.fotos_portfolio = prestador.fotos_portfolio.filter(foto => foto !== fotoUrl);
    await prestador.save();
    
    res.status(200).json(prestador);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};