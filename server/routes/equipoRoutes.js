const express = require("express");
const equipoController = require("../controllers/equipoController");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para el equipo
router.get("/", verificarToken(), equipoController.obtenerEquipos);
router.get("/:id",verificarToken(), equipoController.obtenerEquipoPorId);
router.post("/", verificarToken("cliente"), equipoController.crearEquipo);
router.put("/:id", verificarToken(), equipoController.actualizarEquipo);
router.delete("/:id", verificarToken(), equipoController.eliminarEquipo);

module.exports = router;
