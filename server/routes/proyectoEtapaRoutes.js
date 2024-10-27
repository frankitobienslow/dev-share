const express = require('express');
const verificarToken=require("../middleware/authMiddleware")
const {
    obtenerProyectoEtapas,
    crearProyectoEtapa,
    actualizarProyectoEtapa,
    iniciarEtapa,
    finalizarEtapa,
    getProyectoEtapaByProyectoId
} = require('../controllers/proyectoEtapaController');

const router = express.Router();

// Ruta para obtener todas las etapas de proyectos
router.get('/',verificarToken(), obtenerProyectoEtapas);

// Ruta para crear una nueva etapa de proyecto
router.post('/',verificarToken("cliente"), crearProyectoEtapa);

// Ruta para actualizar una etapa de proyecto
router.put('/:id',verificarToken("cliente"), actualizarProyectoEtapa); // Asegúrate de usar el método PUT para actualizaciones

// Ruta para iniciar una etapa de proyecto
router.put('/iniciar/:id_proyecto_etapa',verificarToken("cliente"), iniciarEtapa); // Ruta para iniciar una etapa

// Ruta para finalizar una etapa de proyecto
router.put('/finalizar/:id_proyecto_etapa',verificarToken("cliente"), finalizarEtapa); // Ruta para finalizar una etapa

router.get('/proyecto/:id_proyecto',verificarToken(), getProyectoEtapaByProyectoId);

module.exports = router;