const express = require("express");
const etapaController = require("../controllers/etapaController");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware"); // Importa tu middleware

// Rutas para el equipo
router.get("/", verificarToken(), etapaController.obtenerEtapa);
router.get("/:id",verificarToken(), etapaController.obtenerEtapaPorId);
router.post("/", verificarToken("cliente"), etapaController.crearEtapa);
router.put("/:id", verificarToken(), etapaController.actualizarEtapa);
router.delete("/:id", verificarToken(), etapaController.eliminarEtapa);

module.exports = router;