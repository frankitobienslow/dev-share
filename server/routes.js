const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes); // Ahora todas las rutas de usuario están protegidas

module.exports = router;