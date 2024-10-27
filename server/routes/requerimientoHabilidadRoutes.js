// routes/requerimientoHabilidadRoutes.js
const express = require('express');
const RequerimientoHabilidadController = require('../controllers/requerimientoHabilidadController');

const router = express.Router();

router.post('/', RequerimientoHabilidadController.create);
router.get('/', RequerimientoHabilidadController.list);
router.get('/:id', RequerimientoHabilidadController.getById);
router.put('/:id', RequerimientoHabilidadController.update);
router.delete('/:id', RequerimientoHabilidadController.remove);

module.exports = router;
