const express = require('express');
const router = express.Router();
const feedbackUsuarioController = require('../controllers/feedbackUsuarioController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Ruta para crear un nuevo feedback de usuario
router.post('/',verificarToken(), feedbackUsuarioController.createFeedbackUsuario);

router.post('/', verificarToken(), feedbackUsuarioController.createFeedbackUsuario);
// Ruta para obtener feedbacks de un usuario destino
router.get('/:id_destino',verificarToken(), feedbackUsuarioController.getFeedbacksByDestino);

module.exports = router;