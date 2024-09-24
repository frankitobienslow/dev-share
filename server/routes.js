const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const habilidadRoutes = require('./routes/habilidadRoutes');
const rolRoutes=require('./routes/rolRoutes');
const nivelRoutes=require('./routes/nivelRoutes');
const evaluacionRoutes=require('./routes/evaluacionRoutes');

const router = express.Router();

router.use('/skills', habilidadRoutes); 
router.use('/rol', rolRoutes); 
router.use('/niveles', nivelRoutes); 
router.use('/tests', evaluacionRoutes); 
router.use('/usuarios', usuarioRoutes); // Ahora todas las rutas de usuario están protegidas


module.exports = router;