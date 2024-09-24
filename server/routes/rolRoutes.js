const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

// Rutas para las operaciones CRUD de rol
router.get('/', rolController.getAllRoles);       // Obtener todos los roles
router.get('/:id', rolController.getRolById);     // Obtener un rol por ID

module.exports = router;