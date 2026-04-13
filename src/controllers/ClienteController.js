const Cliente = require('../models/Cliente');

exports.criar = async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.listar = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const [atualizado] = await Cliente.update(req.body, { where: { id: req.params.id } });
    if (!atualizado) return res.status(404).json({ erro: 'Cliente não encontrado' });
    
    const clienteAtualizado = await Cliente.findByPk(req.params.id);
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const deletado = await Cliente.destroy({ where: { id: req.params.id } });
    if (!deletado) return res.status(404).json({ erro: 'Cliente não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};