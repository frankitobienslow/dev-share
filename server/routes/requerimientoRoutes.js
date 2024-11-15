// routes/requerimientoRoutes.js
const express = require("express");
const router = express.Router();
const requerimientoController = require("../controllers/requerimientoController");

// Rutas para requerimientos
router.get("/", requerimientoController.getAllRequerimientos); // Obtener todos
router.get("/?", requerimientoController.getAllReqByEtapas); // Obtener todos
router.get("/:id", requerimientoController.getRequerimientoById); // Obtener por ID
router.post("/", requerimientoController.createRequerimiento); // Crear
router.put("/:id", requerimientoController.updateRequerimiento); // Actualizar
router.delete("/:id", requerimientoController.deleteRequerimiento); // Eliminar
router.get("/ofertas", requerimientoController.getOfertas); // Obtener pfertas

module.exports = router;
