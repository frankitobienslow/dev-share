const express = require("express");
const UsuarioController = require("../controllers/usuarioController");
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

const router = express.Router();

// Rutas para usuarios
router.get("/", verificarToken(), UsuarioController.getUsuarios); // Obtener todos los usuarios (requiere autenticación)
router.get("/:id", verificarToken(), UsuarioController.getUsuarioById); // Obtener un usuario por ID (requiere autenticación)
router.get("/:id", verificarToken(), UsuarioController.getDesarrolladorById); // Obtener un usuario por ID (requiere autenticación)
router.put("/:id", verificarToken(), UsuarioController.updateUsuario); // Actualizar usuario (requiere autenticación)
//router.delete('/:id', verificarToken, UsuarioController.deleteUsuario); // <---Eliminar usuario || No lo usamos de momento

router.post("/login", UsuarioController.loginUsuario); //Login de usuario (no necesita autenticación)

router.post("/desarrollador", UsuarioController.createDesarrollador); // Ruta para crear desarrollador (no necesita autenticación)
router.post("/cliente", UsuarioController.createCliente); // Ruta para crear cliente (no necesita autenticación)

//router.post('/', UsuarioController.createUsuario); <---Crear usuario (No lo usamos)

module.exports = router;
