const { Op } = require("sequelize");
const Proyecto = require("../models/Proyecto");
const Usuario = require("../models/Usuario");
const Cliente = require("../models/Cliente");
const EquipoDesarrollador = require("../models/EquipoDesarrollador");
const Desarrollador = require("../models/Desarrollador");
const Equipo = require("../models/Equipo");
const Requerimiento = require("../models/Requerimiento"); // Asegúrate de que este modelo esté bien
const RequerimientoHabilidad = require("../models/RequerimientoHabilidad"); // Asegúrate de que este modelo esté bien
const Rol = require("../models/Rol"); // Asegúrate de que este modelo esté bien
const Etapa = require("../models/Etapa");
const ProyectoEtapa = require("../models/ProyectoEtapa");


const ProyectoController = {
  getAllProyectos: async (req, res) => {
    try {
      const { filtro, requerimiento, rol } = req.query;

      let whereCondition = {};

      if (filtro) {
        whereCondition.titulo = {
          [Op.like]: `%${filtro}%`,
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
              model: RequerimientoHabilidad, // Actualización aquí
              attributes: ["id", "nombre"],
              where: requerimiento
                ? { nombre: { [Op.like]: `%${requerimiento}%` } }
                : undefined,
            },
            {
              model: Rol,
              attributes: ["id", "nombre"],
              where: rol ? { nombre: { [Op.like]: `%${rol}%` } } : undefined,
            },
          ],
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

  getProyectoById: async (req, res) => {
    try {
      const proyecto = await Proyecto.findByPk(req.params.id, {
        include: [
          {
            model: Cliente,
            attributes: ["id"],
            include: [
              {
                model: Usuario,
                attributes: ["nombre", "apellido"],
              },
            ],
          },
          {
            model: Equipo,
            attributes: ["id", "nombre"],
            include: [
              {
                model: Desarrollador,
                through: {
                  model: EquipoDesarrollador,
                  attributes: ["activo"],
                },
                as: "desarrolladores",
                attributes: ["id"],
              },
            ],
          },
          {
            model: ProyectoEtapa,
            as: "proyectoEtapas", // Cambia esto al alias correcto
            include: [{ model: Etapa, as: "etapa", attributes: ["nombre"] }],
          },
        ],
      });
  
      if (proyecto) {
        // Calcular la etapaActual
        let etapaActual = null;
  
        if (proyecto.proyectoEtapas && proyecto.proyectoEtapas.length > 0) {
          const etapaIniciada = proyecto.proyectoEtapas.find(
            (etapa) => etapa.fecha_inicio !== null && etapa.fecha_fin === null
          );
  
          if (etapaIniciada) {
            // Si hay una etapa en progreso, asignar su nombre
            etapaActual = etapaIniciada.etapa?.nombre || "Sin nombre";
          } else {
            const todasIniciadas = proyecto.proyectoEtapas.every(
              (etapa) => etapa.fecha_inicio !== null
            );
            const todasFinalizadas = proyecto.proyectoEtapas.every(
              (etapa) => etapa.fecha_fin !== null
            );
  
            if (todasFinalizadas) {
              etapaActual = "Finalizado";
            } else if (!todasIniciadas) {
              etapaActual = "No iniciado";
            }
          }
        } else {
          etapaActual = "No iniciado";
        }
  
        // Añadir etapaActual al objeto del proyecto
        const proyectoConEtapaActual = {
          ...proyecto.toJSON(),
          etapaActual,
        };
  
        res.json(proyectoConEtapaActual);
      } else {
        res.status(404).json({ message: "Proyecto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createProyecto: async (req, res) => {
    try {
      const newProyecto = await Proyecto.create(req.body);
      res.status(201).json(newProyecto);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

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
    console.log("ID Usuario:", id_usuario);
    try {
      if (!req.usuarioId) {
        console.log("Usuario no autenticado");
        return res.status(401).json({ message: "Usuario no autenticado" });
      }

      if (req.usuarioId !== parseInt(id_usuario, 10)) {
        console.log("Acceso no permitido:", req.usuarioId, id_usuario);
        return res.status(403).json({
            message: "No tienes permiso para acceder a estos proyectos",
        });
      }

      const { rol } = req;
      console.log("Rol del usuario:", rol);
      let proyectos;

      if (rol === "cliente") {
        proyectos = await Proyecto.findAll({
          where: { id_cliente: id_usuario },
          include: [
            {
              model: Cliente,
              include: [
                { model: Usuario, attributes: ["id", "nombre", "apellido"] },
              ],
            },
            { model: Equipo, attributes: ["id", "nombre"] },
          ],
        });
      } else if (rol === "desarrollador") {
        const equiposDelDesarrollador = await EquipoDesarrollador.findAll({
          where: { id_desarrollador: id_usuario },
          attributes: ["id_equipo", "activo"],
        });

        console.log("Equipos del desarrollador:", equiposDelDesarrollador);

        const idsEquipos = equiposDelDesarrollador.map((ed) => ed.id_equipo);

        if (idsEquipos.length === 0) {
          console.log("No hay equipos asociados al desarrollador");
          return res.json([]);
        }

        proyectos = await Proyecto.findAll({
          where: { id_equipo: idsEquipos },
          include: [
            {
              model: Cliente,
              include: [
                { model: Usuario, attributes: ["id", "nombre", "apellido"] },
              ],
            },
            {
              model: Equipo,
              attributes: ["id", "nombre"],
              include: [
                {
                  model: Desarrollador,
                  through: {
                    model: EquipoDesarrollador,
                    attributes: ["activo"],
                  },
                  as: "desarrolladores",
                  attributes: ["id"],
                },
              ],
            },
          ],
        });
      } else {
        console.log("Rol de usuario no válido:", rol);
        return res.status(400).json({ message: "Rol de usuario no válido" });
      }

      // Lógica para determinar la etapa actual de cada proyecto
      const proyectosConEtapas = await Promise.all(
        proyectos.map(async (proyecto) => {
          const etapas = await ProyectoEtapa.findAll({
            where: { id_proyecto: proyecto.id },
            include: [{ model: Etapa, as: 'etapa', attributes: ["nombre"] }] // Incluir modelo Etapa con alias
          });
      
          let etapaActual = null;
      
          if (etapas.length > 0) {
            const etapaIniciada = etapas.find(
              (etapa) => etapa.fecha_inicio !== null && etapa.fecha_fin === null
            );
      
            if (etapaIniciada) {
              // Si hay una etapa en progreso, asignar su nombre
              etapaActual = etapaIniciada.etapa?.nombre || "Sin nombre";
            } else {
              const todasIniciadas = etapas.every(
                (etapa) => etapa.fecha_inicio !== null
              );
              const todasFinalizadas = etapas.every(
                (etapa) => etapa.fecha_fin !== null
              );
      
              if (todasFinalizadas) {
                etapaActual = "Finalizado";
              } else if (!todasIniciadas) {
                etapaActual = "No iniciado";
              }
            }
          }else{
            etapaActual="No iniciado"
          }
      
          return { ...proyecto.toJSON(), etapaActual }; 
        })
      );

      console.log("Proyectos obtenidos:", proyectosConEtapas);
      res.json(proyectosConEtapas);
    } catch (error) {
      console.error("Error al obtener los proyectos del usuario:", error);
      res.status(500).json({ message: "Error al obtener los proyectos del usuario" });
    }
}
};

module.exports = ProyectoController;
