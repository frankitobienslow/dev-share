// routes/proyectoEtapaRoutes.js

const express = require('express');
const { obtenerProyectoEtapas, crearProyectoEtapa } = require('../controllers/proyectoEtapaController');

const router = express.Router();

// Ruta para obtener todas las etapas de proyectos
router.get('/', obtenerProyectoEtapas);

// Ruta para crear una nueva etapa de proyecto
router.post('/', crearProyectoEtapa);

module.exports = router;
