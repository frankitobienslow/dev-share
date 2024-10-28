// routes/requerimientoHabilidadRoutes.js
const express = require("express");
const RequerimientoHabilidadController = require("../controllers/requerimientoHabilidadController");
const verificarToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/",
  verificarToken("cliente"),
  RequerimientoHabilidadController.create
);
router.get("/", verificarToken(), RequerimientoHabilidadController.list);
router.get("/:id", verificarToken(), RequerimientoHabilidadController.getById);
router.put("/:id", verificarToken(), RequerimientoHabilidadController.update);
router.delete(
  "/:id",
  verificarToken("cliente"),
  RequerimientoHabilidadController.remove
);
router.get(
  "/:idProyecto/:idDesarrollador",
  verificarToken("desarrollador"),
  RequerimientoHabilidadController.getRequerimientoHabilidadByDesarrolladorId
);
router.put("/:id/toggle-terminado",verificarToken("desarrollador"), RequerimientoHabilidadController.toggleTerminado);

module.exports = router;
