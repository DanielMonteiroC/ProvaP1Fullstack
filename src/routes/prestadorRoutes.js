const express = require('express');
const router = express.Router();
const PrestadorController = require('../controllers/PrestadorController');
const validate = require('../middlewares/validate');
const { prestadorSchema } = require('../validations/prestadorValidation');

// O middleware 'validate' age como um escudo antes de chegar ao 'criar'
router.post('/', validate(prestadorSchema), PrestadorController.criar);

// CRUD Básico (Rota POST duplicada foi removida)
router.get('/', PrestadorController.listar);
router.get('/:id', PrestadorController.buscarPorId);
router.put('/:id', PrestadorController.atualizar);
router.delete('/:id', PrestadorController.deletar);

// Rotas específicas para as regras do Portfólio de Fotos
router.post('/:id/fotos', PrestadorController.adicionarFoto);
router.delete('/:id/fotos', PrestadorController.removerFoto);

module.exports = router;