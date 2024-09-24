const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivelController');

// Rutas para las operaciones CRUD de nivel
router.get('/', nivelController.getAllNiveles);       // Obtener todos los niveles
router.get('/:id', nivelController.getNivelById);     // Obtener un nivel por ID

module.exports = router;