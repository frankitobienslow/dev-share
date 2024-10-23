// Ruta para generar preguntas
const express = require('express');
const router = express.Router();
const gptController = require('../controllers/gptController');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Ruta para generar preguntas
router.post('/generate-questions', gptController.generateQuestions);
router.post('/validate-answers', gptController.validateAnswers);

module.exports = router;
