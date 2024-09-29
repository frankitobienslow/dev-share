const { Proyecto, Cliente, Equipo } = require('../models/Proyecto');

const ProyectoController = {
  // Obtener todos los proyectos
  getAllProyectos: async (req, res) => {
    try {
      const proyectos = await Proyecto.findAll({
        include: [
          { model: Cliente, attributes: ['id', 'nombre'] },
          { model: Equipo, attributes: ['id', 'nombre'] }
        ]
      });
      res.json(proyectos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Obtener un proyecto por ID
  getProyectoById: async (req, res) => {
    try {
      const proyecto = await Proyecto.findByPk(req.params.id, {
        include: [
          { model: Cliente, attributes: ['id', 'nombre'] },
          { model: Equipo, attributes: ['id', 'nombre'] }
        ]
      });
      if (proyecto) {
        res.json(proyecto);
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Crear un nuevo proyecto
  createProyecto: async (req, res) => {
    try {
      const newProyecto = await Proyecto.create(req.body);
      res.status(201).json(newProyecto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Actualizar un proyecto
  updateProyecto: async (req, res) => {
    try {
      const [updated] = await Proyecto.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedProyecto = await Proyecto.findByPk(req.params.id);
        res.json(updatedProyecto);
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un proyecto
  deleteProyecto: async (req, res) => {
    try {
      const deleted = await Proyecto.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.json({ message: 'Proyecto eliminado exitosamente' });
      } else {
        res.status(404).json({ message: 'Proyecto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = ProyectoController;