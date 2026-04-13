const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

router.post('/', ClienteController.criar);
router.get('/', ClienteController.listar);
router.get('/:id', ClienteController.buscarPorId);
router.put('/:id', ClienteController.atualizar); // Atualiza dados gerais e sobrescreve foto_perfil
router.delete('/:id', ClienteController.deletar);

module.exports = router;