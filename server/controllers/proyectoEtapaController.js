// controllers/proyectoEtapaController.js

const ProyectoEtapa = require('../models/ProyectoEtapa');

// Obtener todas las etapas de proyectos
const obtenerProyectoEtapas = async (req, res) => {
    try {
        const etapas = await ProyectoEtapa.findAll();
        res.json(etapas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las etapas de proyectos' });
    }
};

// Crear una nueva etapa de proyecto
const crearProyectoEtapa = async (req, res) => {
    const { id_proyecto, id_etapa, fecha_inicio, fecha_fin } = req.body;
    try {
        const nuevaEtapa = await ProyectoEtapa.create({ id_proyecto, id_etapa, fecha_inicio, fecha_fin });
        res.status(201).json(nuevaEtapa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la etapa de proyecto' });
    }
};

// Exportar los controladores
module.exports = {
    obtenerProyectoEtapas,
    crearProyectoEtapa,
};
