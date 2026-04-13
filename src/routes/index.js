const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
// O validateUser antigo pode ser adaptado, mas por enquanto vamos direto pro controller.

// GET - Listar Todos
router.get('/users', userController.listUsers);

// POST - Criação de um usuário (Salva em ambos os bancos)
router.post('/users', userController.createUser);

// PUT - Atualizar Foto de Perfil (Máx 1)
router.put('/users/:id/foto-perfil', userController.updateProfilePhoto);

// POST - Adicionar Foto na Área de Fotos (Máx 5, apenas prestador)
router.post('/users/:id/fotos-portfolio', userController.addPortfolioPhoto);

module.exports = router;