const express = require('express');
const router = express.Router();
const postulacionController = require('../controllers/postulacionController');

// Route to create a new postulacion
router.post('/', postulacionController.createPostulacion);

// Route to get all postulaciones
router.get('/', postulacionController.getAllPostulaciones);

// Route to get a specific postulacion by ID
router.get('/:id', postulacionController.getPostulacionById);

// Route to update a postulacion by ID
router.put('/:id', postulacionController.updatePostulacion);

// Route to delete a postulacion by ID
router.delete('/:id', postulacionController.deletePostulacion);

module.exports = router;
