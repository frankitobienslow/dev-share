const express = require('express');
const UsuarioController = require('../controllers/usuarioController'); // Ajusta la ruta según tu estructura

const router = express.Router();

// Rutas para usuarios
router.post('/', UsuarioController.createUsuario);       // Crear usuario
router.get('/', UsuarioController.getUsuarios);       // Obtener todos los usuarios
router.get('/:id', UsuarioController.getUsuarioById);    // Obtener un usuario por ID
router.put('/:id', UsuarioController.updateUsuario);      // Actualizar usuario
router.delete('/:id', UsuarioController.deleteUsuario);   // Eliminar usuario

module.exports = router;