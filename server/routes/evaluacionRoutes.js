const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacionController');

// Rutas para las operaciones CRUD de evaluación
router.get('/', evaluacionController.getAllEvaluaciones);      // Obtener todas las evaluaciones
router.get('/:id', evaluacionController.getEvaluacionById);    // Obtener una evaluación por ID
router.post('/', evaluacionController.createEvaluacion);       // Crear una nueva evaluación

module.exports = router;