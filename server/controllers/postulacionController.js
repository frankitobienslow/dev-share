const Postulacion = require('../models/Postulacion');

// Crear una nueva postulacion
exports.createPostulacion = async (req, res) => {
    const { id_desarrollador, id_requerimiento_rol, activa } = req.body;
    try {
        const newPostulacion = await Postulacion.create({
            id_desarrollador,
            id_requerimiento_rol,
            activa
        });
        res.status(201).json(newPostulacion);
    } catch (error) {
        res.status(500).json({ message: 'Error creating postulacion', error });
    }
};

// Get all postulaciones
exports.getAllPostulaciones = async (req, res) => {
    try {
        const postulaciones = await Postulacion.findAll();
        res.status(200).json(postulaciones);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching postulaciones', error });
    }
};

// Get postulacion by ID
exports.getPostulacionById = async (req, res) => {
    const { id } = req.params;
    try {
        const postulacion = await Postulacion.findByPk(id);
        if (postulacion) {
            res.status(200).json(postulacion);
        } else {
            res.status(404).json({ message: 'Postulacion not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching postulacion', error });
    }
};

// Update a postulacion
exports.updatePostulacion = async (req, res) => {
    const { id } = req.params;
    const { id_desarrollador, id_requerimiento_rol, activa } = req.body;
    try {
        const postulacion = await Postulacion.findByPk(id);
        if (postulacion) {
            postulacion.id_desarrollador = id_desarrollador;
            postulacion.id_requerimiento_rol = id_requerimiento_rol;
            postulacion.activa = activa;
            await postulacion.save();
            res.status(200).json(postulacion);
        } else {
            res.status(404).json({ message: 'Postulacion not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating postulacion', error });
    }
};

// Delete a postulacion
exports.deletePostulacion = async (req, res) => {
    const { id } = req.params;
    try {
        const postulacion = await Postulacion.findByPk(id);
        if (postulacion) {
            await postulacion.destroy();
            res.status(200).json({ message: 'Postulacion deleted successfully' });
        } else {
            res.status(404).json({ message: 'Postulacion not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting postulacion', error });
    }
};
