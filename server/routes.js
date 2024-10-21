const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const habilidadRoutes = require('./routes/habilidadRoutes');
const rolRoutes=require('./routes/rolRoutes');
const nivelRoutes=require('./routes/nivelRoutes');
const evaluacionRoutes=require('./routes/evaluacionRoutes');
const gptRoutes=require('./routes/gptRoutes');
const equipoRoutes=require('./routes/equipoRoutes');
const equipoDesarrolladorRoutes=require('./routes/equipoDesarrolladorRoutes');
const proyectoRoutes=require('./routes/proyectoRoutes');
const feedbackRoutes=require('./routes/feedbackRoutes');
const feedbackUsuarioRoutes=require('./routes/feedbackUsuarioRoutes');

const router = express.Router();

router.use('/skills', habilidadRoutes); 
router.use('/rol', rolRoutes); 
router.use('/niveles', nivelRoutes); 
router.use('/tests', evaluacionRoutes); 
router.use('/usuarios', usuarioRoutes); // Ahora todas las rutas de usuario están protegidas
router.use('/gpt', gptRoutes); 
router.use('/proyectos', proyectoRoutes); 
router.use('/feedback', feedbackRoutes); 
router.use('/feedbackUsuario', feedbackUsuarioRoutes); 

module.exports = router;