const express = require("express");
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

const {
  getAllProyectos,
  getProyectoById,
  createProyecto,
  updateProyecto,
  deleteProyecto,
  getProyectosByUsuario,
} = require("../controllers/proyectoController");

const router = express.Router();

// Solicitudes al controlador

// llama a todos los proyectos
router.get("/", verificarToken(), getAllProyectos);
// Llama al proyecto con ID en particular
router.get("/:id", verificarToken(), getProyectoById);
// Actualiza los campos del proyecto
router.put("/:id", verificarToken("cliente"), updateProyecto);
//crea un  nuevo proyecto
router.post("/", verificarToken("cliente"), createProyecto);
//elimina un proyectos
router.delete("/:id", verificarToken("cliente"), deleteProyecto);

router.get("/usuario/:id_usuario", verificarToken(), getProyectosByUsuario);

module.exports = router;
