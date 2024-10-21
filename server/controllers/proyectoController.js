const { Op } = require('sequelize');
const Proyecto = require("../models/Proyecto");
const Cliente = require("../models/Cliente");
const Equipo = require("../models/Equipo");
const Requerimiento = require("../models/Requerimiento"); // Asegúrate de que este modelo esté bien
const RequerimientoRol = require("../models/RequerimientoRol"); // Asegúrate de que este modelo esté bien
const Rol = require("../models/Rol"); // Asegúrate de que este modelo esté bien

const ProyectoController = {
  getAllProyectos: async (req, res) => {
    try {
      const { titulo, requerimiento, rol } = req.query; // Obtener los parámetros de búsqueda

      let whereCondition = {}; // Condiciones de búsqueda para el título

      if (titulo) {
        whereCondition.titulo = {
          [Op.like]: `%${titulo}%`, // Filtro por título (insensible a mayúsculas)
        };
      }

      let includeCondition = [
        { model: Cliente, attributes: ["id", "nombre"] },
        { model: Equipo, attributes: ["id", "nombre"] },
      ];

      if (requerimiento || rol) {
        // Incluir los requerimientos y roles en la búsqueda
        includeCondition.push({
          model: Requerimiento,
          include: [
            {
              model: Rol,
              attributes: ["id", "nombre"], // Filtro de roles asociados a los requerimientos
              where: rol ? { nombre: { [Op.like]: `%${rol}%` } } : undefined,
            },
          ],
          where: requerimiento ? { nombre: { [Op.like]: `%${requerimiento}%` } } : undefined,
        });
      }

      const proyectos = await Proyecto.findAll({
        where: whereCondition,
        include: includeCondition,
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
          {
            model: Cliente,
            attributes: ["id"],
            include: [
              {
                model: Usuario, // Incluir el modelo Usuario
                attributes: ["nombre", "apellido"], // Atributos que necesitas del Usuario
              },
            ],
          },
          { model: Equipo, attributes: ["id", "nombre"] },
        ],
      });
      
      if (proyecto) {
        res.json(proyecto);
      } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
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
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedProyecto = await Proyecto.findByPk(req.params.id);
        res.json(updatedProyecto);
      } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Eliminar un proyecto
  deleteProyecto: async (req, res) => {
    try {
      const deleted = await Proyecto.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: "Proyecto eliminado exitosamente" });
      } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProyectosByUsuario : async (req, res) => {
    const { id_usuario } = req.params; // Obtener el ID del usuario de los parámetros
    try {
        // Verifica que el usuario esté autenticado
        if (!req.usuarioId) {
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        // Opcionalmente, verifica si el ID del usuario que hace la solicitud coincide con el id_usuario
        if (req.usuarioId !== parseInt(id_usuario, 10)) {
            return res.status(403).json({ message: "No tienes permiso para acceder a estos proyectos" });
        }

        const { rol } = req; // Aquí puedes obtener el rol que has adjuntado
        let proyectos;

        if (rol === "cliente") {
            proyectos = await Proyecto.findAll({
                where: { id_cliente: id_usuario },
                include: [
                    {
                        model: Cliente,
                        include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }] // Incluir Usuario aquí
                    },
                    { model: Equipo, attributes: ["id", "nombre"] },
                ],
            });
        } else if (rol === "desarrollador") {
            const equiposDelDesarrollador = await EquipoDesarrollador.findAll({
                where: { id_desarrollador: id_usuario },
                attributes: ["id_equipo"],
            });

            const idsEquipos = equiposDelDesarrollador.map((ed) => ed.id_equipo);

            if (idsEquipos.length === 0) {
                return res.json([]); // Si no hay equipos, retorna un array vacío
            }

            proyectos = await Proyecto.findAll({
                where: { id_equipo: idsEquipos },
                include: [
                    {
                        model: Cliente,
                        include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }] // Incluir Usuario aquí
                    },
                    { model: Equipo, attributes: ["id", "nombre"] },
                ],
            });
        } else {
            return res.status(400).json({ message: "Rol de usuario no válido" });
        }

        res.json(proyectos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los proyectos del usuario" });
    }
}
};

module.exports = ProyectoController;