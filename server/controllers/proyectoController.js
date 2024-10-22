const { Op } = require('sequelize');
const EquipoDesarrollador=require('../models/EquipoDesarrollador');
const Proyecto = require("../models/Proyecto");
const Cliente = require("../models/Cliente");
const Equipo = require("../models/Equipo");
const Requerimiento = require("../models/Requerimiento"); // Asegúrate de que este modelo esté bien
const RequerimientoRol = require("../models/RequerimientoRol"); // Asegúrate de que este modelo esté bien
const Rol = require("../models/Rol"); // Asegúrate de que este modelo esté bien
const Usuario = require("../models/Usuario");

const ProyectoController = {
  getAllProyectos: async (req, res) => {
    try {
      const { filtro, requerimiento, rol } = req.query; // Cambio de 'titulo' a 'filtro'

      let whereCondition = {};

      if (filtro) {
        whereCondition.titulo = {
          [Op.like]: `%${filtro}%`, // Filtro por título
        };
      }

      let includeCondition = [
        { model: Cliente, attributes: ["id"] },
        { model: Equipo, attributes: ["id", "nombre"] },
      ];

      if (requerimiento || rol) {
        includeCondition.push({
          model: Requerimiento,
          include: [
            {
              model: Rol,
              attributes: ["id", "nombre"],
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

  getProyectosByUsuario: async (req, res) => {
    const { id_usuario } = req.params;
    console.log('ID Usuario:', id_usuario); // Log para verificar ID de usuario
    try {
        // Verifica que el usuario esté autenticado
        if (!req.usuarioId) {
            console.log('Usuario no autenticado');
            return res.status(401).json({ message: "Usuario no autenticado" });
        }

        // Opcionalmente, verifica si el ID del usuario que hace la solicitud coincide con el id_usuario
        if (req.usuarioId !== parseInt(id_usuario, 10)) {
            console.log('Acceso no permitido:', req.usuarioId, id_usuario);
            return res.status(403).json({ message: "No tienes permiso para acceder a estos proyectos" });
        }

        const { rol } = req;
        console.log('Rol del usuario:', rol); // Log para verificar el rol
        let proyectos;

        if (rol === "cliente") {
            proyectos = await Proyecto.findAll({
                where: { id_cliente: id_usuario },
                include: [
                    {
                        model: Cliente,
                        include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }]
                    },
                    { model: Equipo, attributes: ["id", "nombre"] },
                ],
            });
        } else if (rol === "desarrollador") {
            const equiposDelDesarrollador = await EquipoDesarrollador.findAll({
                where: { id_desarrollador: id_usuario },
                attributes: ["id_equipo"],
            });

            console.log('Equipos del desarrollador:', equiposDelDesarrollador);

            const idsEquipos = equiposDelDesarrollador.map((ed) => ed.id_equipo);

            if (idsEquipos.length === 0) {
                console.log('No hay equipos asociados al desarrollador');
                return res.json([]);
            }

            proyectos = await Proyecto.findAll({
                where: { id_equipo: idsEquipos },
                include: [
                    {
                        model: Cliente,
                        include: [{ model: Usuario, attributes: ["id", "nombre", "apellido"] }]
                    },
                    { model: Equipo, attributes: ["id", "nombre"] },
                ],
            });
        } else {
            console.log('Rol de usuario no válido:', rol);
            return res.status(400).json({ message: "Rol de usuario no válido" });
        }

        console.log('Proyectos obtenidos:', proyectos);
        res.json(proyectos);
    } catch (error) {
        console.error('Error al obtener los proyectos del usuario:', error);
        res.status(500).json({ message: "Error al obtener los proyectos del usuario" });
    }
}

};

module.exports = ProyectoController;