const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para las operaciones CRUD de rol
router.get('/', verificarToken('cliente'), rolController.getAllRoles);       // Obtener todos los roles
router.get('/:id',verificarToken('cliente'), rolController.getRolById);     // Obtener un rol por ID

module.exports = router;