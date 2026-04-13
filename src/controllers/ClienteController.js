const Cliente = require('../models/Cliente');
const ClienteService = require('../services/ClienteService'); // Importamos o service para uso futuro

exports.criar = async (req, res) => {
  try {
    // Passamos a usar o service para manter o mesmo padrão do Prestador
    const cliente = await ClienteService.criar(req.body); 
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
    // Em vez de usar update direto (que causa falso 404), buscamos primeiro a instância
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ erro: 'Cliente não encontrado' });
    
    // Atualiza a instância com os novos dados
    await cliente.update(req.body);
    res.status(200).json(cliente);
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