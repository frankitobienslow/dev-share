const express = require('express');
const equipoDesarrolladorController = require('../controllers/equipoDesarrolladorController');
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para la relación equipo-desarrollador
router.get('/:id_equipo/desarrolladores',verificarToken(), equipoDesarrolladorController.obtenerDesarrolladoresPorEquipo);
router.post('/',verificarToken("cliente"), equipoDesarrolladorController.agregarDesarrolladorAEquipo);
router.delete('/:id_equipo/:id_desarrollador',verificarToken(), equipoDesarrolladorController.eliminarDesarrolladorDeEquipo);

module.exports = router;