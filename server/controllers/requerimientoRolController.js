// controllers/requerimientoRolController.js
const RequerimientoRol = require('../models/RequerimientoRol');

const RequerimientoRolController = {
  // Crear un nuevo requerimiento rol
  async create(req, res) {
    try {
      const { id_requerimiento, cantidad_desarrolladores, id_habilidad, id_nivel } = req.body;
      const newRequerimientoRol = await RequerimientoRol.create({ 
        id_requerimiento, 
        cantidad_desarrolladores, 
        id_habilidad, 
        id_nivel 
      });
      res.status(201).json(newRequerimientoRol);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el requerimiento rol', error });
    }
  },

  // Listar todos los requerimientos rol
  async list(req, res) {
    try {
      const requerimientosRol = await RequerimientoRol.findAll();
      res.status(200).json(requerimientosRol);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los requerimientos rol', error });
    }
  },

  // Obtener un requerimiento rol por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const requerimientoRol = await RequerimientoRol.findByPk(id);
      if (!requerimientoRol) {
        return res.status(404).json({ message: 'Requerimiento rol no encontrado' });
      }
      res.status(200).json(requerimientoRol);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el requerimiento rol', error });
    }
  },

  // Actualizar un requerimiento rol
  async update(req, res) {
    const { id } = req.params;
    try {
      const requerimientoRol = await RequerimientoRol.findByPk(id);
      if (!requerimientoRol) {
        return res.status(404).json({ message: 'Requerimiento rol no encontrado' });
      }
      const { id_requerimiento, cantidad_desarrolladores, id_habilidad, id_nivel } = req.body;
      await requerimientoRol.update({ 
        id_requerimiento, 
        cantidad_desarrolladores, 
        id_habilidad, 
        id_nivel 
      });
      res.status(200).json(requerimientoRol);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el requerimiento rol', error });
    }
  },

  // Eliminar un requerimiento rol
  async remove(req, res) {
    const { id } = req.params;
    try {
      const requerimientoRol = await RequerimientoRol.findByPk(id);
      if (!requerimientoRol) {
        return res.status(404).json({ message: 'Requerimiento rol no encontrado' });
      }
      await requerimientoRol.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el requerimiento rol', error });
    }
  },
};

module.exports = RequerimientoRolController;
