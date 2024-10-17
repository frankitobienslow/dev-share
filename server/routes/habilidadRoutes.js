const express = require('express');
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

const { 
    getHabilidades, 
    getHabilidadPorId
} = require('../controllers/habilidadController');

const router = express.Router();

router.get('/',verificarToken(), getHabilidades);
router.get('/:id',verificarToken(), getHabilidadPorId);

module.exports = router;