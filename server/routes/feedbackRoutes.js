const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Ruta para obtener todos los tipos de feedback
router.get('/',verificarToken(), feedbackController.getAllFeedback);

// Ruta para obtener un feedback por ID
router.get('/:id',verificarToken(), feedbackController.getFeedbackById);

module.exports = router;