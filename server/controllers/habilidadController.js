const Habilidad = require('../models/Habilidad');

exports.getHabilidades = async (req, res) => {
    try {
        const habilidades = await Habilidad.findAll();
        res.status(200).json(habilidades);
    } catch (error) {
        console.error("Error al obtener habilidades:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.getHabilidadPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const habilidad = await Habilidad.findByPk(id);
        if (!habilidad) {
            return res.status(404).json({ message: 'Habilidad no encontrada' });
        }
        res.status(200).json(habilidad);
    } catch (error) {
        console.error("Error al obtener habilidad:", error);
        res.status(500).json({ error: error.message });
    }
};