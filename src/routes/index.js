const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const validateUser = require('../middlewares/validateuser');

//GET Listar Todos
router.get('/users', userController.listUsers);

//GET Listar usuários por ID (req.params)
router.get('/users/:id', userController.getUser);

//POST - Criação de um usuário
router.post('/users', validateUser, userController.createUser);

//PUT - Atualizar usuário
router.put('/users/:id', userController.updateUser);

//DELETE
router.delete('/users/:id', userController.deleteUser);


module.exports = router;