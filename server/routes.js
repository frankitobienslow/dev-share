const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');

const router = express.Router();

router.use('/usuarios', usuarioRoutes);       // /api/usuarios

module.exports = router;