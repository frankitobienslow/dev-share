const express = require('express');
const router = express.Router();
const nivelController = require('../controllers/nivelController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para las operaciones CRUD de nivel
router.get('/',verificarToken(), nivelController.getAllNiveles);       // Obtener todos los niveles
router.get('/:id',verificarToken(), nivelController.getNivelById);     // Obtener un nivel por ID

module.exports = router;