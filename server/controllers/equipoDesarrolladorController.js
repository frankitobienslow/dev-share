const EquipoDesarrollador= require('../models/EquipoDesarrollador'); // Importa los modelos
const Equipo= require('../models/Equipo'); // Importa los modelos
const Desarrollador=require('../models/Desarrollador')

const equipoDesarrolladorController = {
  // Obtener todos los desarrolladores de un equipo
  obtenerDesarrolladoresPorEquipo: async (req, res) => {
    try {
      const { id_equipo } = req.params;
      const desarrolladores = await EquipoDesarrollador.findAll({
        where: { id_equipo },
        include: [{
          model: Desarrollador,
          as: 'Desarrollador', // El alias que definiste en la asociación
        }],
      });
      res.json(desarrolladores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los desarrolladores del equipo.' });
    }
  },

  // Agregar un desarrollador a un equipo
  agregarDesarrolladorAEquipo: async (req, res) => {
    try {
      const { id_equipo, id_desarrollador } = req.body;
      const nuevoRegistro = await EquipoDesarrollador.create({ id_equipo, id_desarrollador });
      res.status(201).json(nuevoRegistro);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar desarrollador al equipo.' });
    }
  },

  // Eliminar un desarrollador de un equipo
  eliminarDesarrolladorDeEquipo: async (req, res) => {
    try {
      const { id_equipo, id_desarrollador } = req.params;
      const registro = await EquipoDesarrollador.findOne({
        where: { id_equipo, id_desarrollador },
      });
      if (!registro) {
        return res.status(404).json({ error: 'Registro no encontrado.' });
      }
      await registro.destroy();
      res.json({ message: 'Desarrollador eliminado del equipo.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar desarrollador del equipo.' });
    }
  },
};

module.exports = equipoDesarrolladorController;