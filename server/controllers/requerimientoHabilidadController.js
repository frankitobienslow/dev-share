// controllers/requerimientoHabilidadController.js
const RequerimientoHabilidad = require('../models/RequerimientoHabilidad');

const RequerimientoHabilidadController = {
  // Crear un nuevo requerimiento habilidad
  async create(req, res) {
    try {
      const { id_requerimiento, id_habilidad, id_nivel, id_desarrollador } = req.body;
      const newRequerimientoHabilidad = await RequerimientoHabilidad.create({ 
        id_requerimiento, 
        id_habilidad, 
        id_nivel,
        id_desarrollador // Nueva clave foránea
      });
      res.status(201).json(newRequerimientoHabilidad);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el requerimiento habilidad', error });
    }
  },

  // Listar todos los requerimientos habilidad
  async list(req, res) {
    try {
      const requerimientosHabilidad = await RequerimientoHabilidad.findAll();
      res.status(200).json(requerimientosHabilidad);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los requerimientos habilidad', error });
    }
  },

  // Obtener un requerimiento habilidad por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res.status(404).json({ message: 'Requerimiento habilidad no encontrado' });
      }
      res.status(200).json(requerimientoHabilidad);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el requerimiento habilidad', error });
    }
  },

  // Actualizar un requerimiento habilidad
  async update(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res.status(404).json({ message: 'Requerimiento habilidad no encontrado' });
      }
      const { id_requerimiento, id_habilidad, id_nivel, id_desarrollador } = req.body;
      await requerimientoHabilidad.update({ 
        id_requerimiento, 
        id_habilidad, 
        id_nivel,
        id_desarrollador // Actualización del desarrollador asociado
      });
      res.status(200).json(requerimientoHabilidad);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el requerimiento habilidad', error });
    }
  },

  // Eliminar un requerimiento habilidad
  async remove(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res.status(404).json({ message: 'Requerimiento habilidad no encontrado' });
      }
      await requerimientoHabilidad.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el requerimiento habilidad', error });
    }
  },
};

module.exports = RequerimientoHabilidadController;