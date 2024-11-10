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
    const { id_proyecto, id_etapa } = req.body; // No recibimos fechas desde el cuerpo
    const {fecha_inicio, fecha_fin} = req.body;
    try {
        const nuevaEtapa = await ProyectoEtapa.create({
            id_proyecto,
            id_etapa,
            fecha_inicio, // Asignar null por defecto
            fecha_fin, // Asignar null por defecto
        });
        res.status(201).json(nuevaEtapa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la etapa de proyecto' });
    }
};

// Actualizar una etapa de proyecto
const actualizarProyectoEtapa = async (req, res) => {
    const { id } = req.params; // ID de la etapa a actualizar
    const { fecha_inicio, fecha_fin } = req.body; // Recibimos las fechas desde el cuerpo

    try {
        const etapa = await ProyectoEtapa.findByPk(id);
        if (!etapa) {
            return res.status(404).json({ message: 'Etapa no encontrada' });
        }

        // Actualizamos los campos necesarios
        etapa.fecha_inicio = fecha_inicio !== undefined ? fecha_inicio : etapa.fecha_inicio; // Mantener el valor anterior si no se recibe uno nuevo
        etapa.fecha_fin = fecha_fin !== undefined ? fecha_fin : etapa.fecha_fin;

        await etapa.save(); // Guardamos los cambios
        res.json(etapa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la etapa de proyecto' });
    }
};

// Iniciar una etapa de proyecto
const iniciarEtapa = async (req, res) => {
    const { id_proyecto_etapa } = req.params; // ID de la etapa a iniciar

    try {
        const etapa = await ProyectoEtapa.findByPk(id_proyecto_etapa);
        if (!etapa) {
            return res.status(404).json({ message: 'Etapa no encontrada' });
        }

        // Asignar la fecha de inicio a la fecha actual
        etapa.fecha_inicio = new Date();
        await etapa.save(); // Guardar los cambios

        res.json(etapa); // Retornar la etapa actualizada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar la etapa de proyecto' });
    }
};

// Finalizar una etapa de proyecto
const finalizarEtapa = async (req, res) => {
    const { id_proyecto_etapa } = req.params; // ID de la etapa a finalizar

    try {
        const etapa = await ProyectoEtapa.findByPk(id_proyecto_etapa);
        if (!etapa) {
            return res.status(404).json({ message: 'Etapa no encontrada' });
        }

        // Asignar la fecha de fin a la fecha actual
        etapa.fecha_fin = new Date();
        await etapa.save(); // Guardar los cambios

        res.json(etapa); // Retornar la etapa actualizada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al finalizar la etapa de proyecto' });
    }
};

const getProyectoEtapaByProyectoId = async (req, res) => {
    const { id_proyecto } = req.params; // ID del proyecto

    try {
        const etapas = await ProyectoEtapa.findAll({
            where: { id_proyecto },
        });

        // Verificar si hay etapas para el proyecto
        if (etapas.length === 0) {
            return res.status(404).json({ message: `El proyecto con id ${id_proyecto} no tiene etapas` });
        }

        res.json(etapas); // Retorna las etapas encontradas
    } catch (error) {
        console.error('Error al obtener las etapas del proyecto:', error);
        res.status(500).json({ message: 'Error al obtener las etapas del proyecto' });
    }
};

// Exportar los controladores
module.exports = {
    obtenerProyectoEtapas,
    crearProyectoEtapa,
    actualizarProyectoEtapa,
    iniciarEtapa,
    finalizarEtapa,
    getProyectoEtapaByProyectoId
};