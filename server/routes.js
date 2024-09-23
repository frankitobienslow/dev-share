const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const habilidadRoutes = require('./routes/usuarioRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes); // Ahora todas las rutas de usuario están protegidas
router.use('/habilidad', habilidadRoutes); // Ahora todas las rutas de usuario están protegidas

module.exports = router;