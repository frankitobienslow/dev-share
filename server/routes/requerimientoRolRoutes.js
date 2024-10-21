// routes/requerimientoRolRoutes.js
const express = require('express');
const RequerimientoRolController = require('../controllers/requerimientoRolController');

const router = express.Router();

router.post('/', RequerimientoRolController.create);
router.get('/', RequerimientoRolController.list);
router.get('/:id', RequerimientoRolController.getById);
router.put('/:id', RequerimientoRolController.update);
router.delete('/:id', RequerimientoRolController.remove);

module.exports = router;
