const  Equipo = require('../models/Equipo'); // Importa el modelo de Equipo

const equipoController = {
  // Obtener todos los equipos
  obtenerEquipos: async (req, res) => {
    try {
      const equipos = await Equipo.findAll();
      res.json(equipos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los equipos.' });
    }
  },

  // Obtener un equipo por ID
  obtenerEquipoPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const equipo = await Equipo.findByPk(id);
      if (!equipo) {
        return res.status(404).json({ error: 'Equipo no encontrado.' });
      }
      res.json(equipo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el equipo.' });
    }
  },

  // Crear un equipo
  crearEquipo: async (req, res) => {
    try {
      const { nombre } = req.body;
      console.log(nombre);
      const nuevoEquipo = await Equipo.create({ nombre });
      res.status(201).json(nuevoEquipo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el equipo.' });
    }
  },

  // Actualizar un equipo
  actualizarEquipo: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre } = req.body;
      const equipo = await Equipo.findByPk(id);
      if (!equipo) {
        return res.status(404).json({ error: 'Equipo no encontrado.' });
      }
      equipo.nombre = nombre;
      await equipo.save();
      res.json(equipo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el equipo.' });
    }
  },

  // Eliminar un equipo
  eliminarEquipo: async (req, res) => {
    try {
      const { id } = req.params;
      const equipo = await Equipo.findByPk(id);
      if (!equipo) {
        return res.status(404).json({ error: 'Equipo no encontrado.' });
      }
      await equipo.destroy();
      res.json({ message: 'Equipo eliminado correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el equipo.' });
    }
  },
};

module.exports = equipoController;
