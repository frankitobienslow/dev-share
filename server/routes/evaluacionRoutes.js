const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para las operaciones CRUD de evaluación
router.get('/',verificarToken(),evaluacionController.getAllEvaluaciones);      // Obtener todas las evaluaciones
router.get('/:id', verificarToken(), evaluacionController.getEvaluacionById);    // Obtener una evaluación por ID
router.post('/', verificarToken('desarrollador'),evaluacionController.createEvaluacion);       // Crear una nueva evaluación
router.get('/usuario/:id_usuario', verificarToken(), evaluacionController.getEvaluacionesByUserId);

module.exports = router;