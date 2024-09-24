const express = require('express');

const { 
    getHabilidades, 
    getHabilidadPorId
} = require('../controllers/habilidadController');

const router = express.Router();

router.get('/', getHabilidades);
router.get('/:id', getHabilidadPorId);

module.exports = router;