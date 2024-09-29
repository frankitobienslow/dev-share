const express = require('express');

const {
    getAllProyectos,
    getProyectoById,
    createProyecto,
    updateProyecto,
    deleteProyecto
} = require ('../controllers/proyectoController');
//const ProyectoController = require('../controllers/proyectoController');

const router = express.Router();

// Solicitudes al controlador

// llama a todos los proyectos 
router.get('/',getAllProyectos);
// Llama al proyecto con ID en particular
router.get('/:id',getProyectoById);
// Actualiza los campos del proyecto 
router.put('/:id',updateProyecto);
//crea un  nuevo proyecto
router.post('/',createProyecto);
//elimina un proyectos
router.delete('/:id',deleteProyecto);




module.exports=router;