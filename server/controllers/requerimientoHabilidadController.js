const RequerimientoHabilidad = require("../models/RequerimientoHabilidad");
const ProyectoEtapa = require("../models/ProyectoEtapa");
const Etapa = require("../models/Etapa");
const Requerimiento = require("../models/Requerimiento");
const Habilidad = require("../models/Habilidad");
const Nivel = require("../models/Nivel");

const RequerimientoHabilidadController = {
  // Crear un nuevo requerimiento habilidad
  async create(req, res) {
    try {
      const {
        id_requerimiento,
        id_habilidad,
        id_nivel,
        id_desarrollador,
        terminado,
      } = req.body;
      const newRequerimientoHabilidad = await RequerimientoHabilidad.create({
        id_requerimiento,
        id_habilidad,
        id_nivel,
        id_desarrollador,
        terminado, // Incluye el campo terminado
      });
      res.status(201).json(newRequerimientoHabilidad);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el requerimiento habilidad", error });
    }
  },

  // Listar todos los requerimientos habilidad
  async list(req, res) {
    try {
      const requerimientosHabilidad = await RequerimientoHabilidad.findAll();
      res.status(200).json(requerimientosHabilidad);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los requerimientos habilidad",
        error,
      });
    }
  },

  // Obtener un requerimiento habilidad por ID
  async getById(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res
          .status(404)
          .json({ message: "Requerimiento habilidad no encontrado" });
      }
      res.status(200).json(requerimientoHabilidad);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el requerimiento habilidad",
        error,
      });
    }
  },

  // Actualizar un requerimiento habilidad
  async update(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res
          .status(404)
          .json({ message: "Requerimiento habilidad no encontrado" });
      }
      const {
        id_requerimiento,
        id_habilidad,
        id_nivel,
        id_desarrollador,
        terminado,
      } = req.body;
      await requerimientoHabilidad.update({
        id_requerimiento,
        id_habilidad,
        id_nivel,
        id_desarrollador,
        terminado, // Incluye el campo terminado en la actualización
      });
      res.status(200).json(requerimientoHabilidad);
    } catch (error) {
      res.status(500).json({
        message: "Error al actualizar el requerimiento habilidad",
        error,
      });
    }
  },

  // Eliminar un requerimiento habilidad
  async remove(req, res) {
    const { id } = req.params;
    try {
      const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);
      if (!requerimientoHabilidad) {
        return res
          .status(404)
          .json({ message: "Requerimiento habilidad no encontrado" });
      }
      await requerimientoHabilidad.destroy();
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({
        message: "Error al eliminar el requerimiento habilidad",
        error,
      });
    }
  },

  async getRequerimientoHabilidadByDesarrolladorId(req, res) {
    const { idProyecto, idDesarrollador } = req.params;
    console.log("idProyecto:", idProyecto);
    console.log("idDesarrollador:", idDesarrollador);

    try {
        // 1. Buscar todos los proyecto_etapa cuyo id_proyecto sea el id del proyecto pasado por parámetro
        const proyectoEtapas = await ProyectoEtapa.findAll({
            where: { id_proyecto: idProyecto },
            include: [{ model: Etapa, as: "etapa", attributes: ["nombre"] }],
        });

        if (!proyectoEtapas.length) {
            return res.status(404).json({ message: "No se encontraron etapas para el proyecto" });
        }

        const proyectoEtapaIds = proyectoEtapas.map((pe) => pe.id);

        // 2. Buscar todos los requerimientos cuyo id_proyecto_etapa esté en proyectoEtapaIds
        const requerimientos = await Requerimiento.findAll({
            where: { id_proyecto_etapa: proyectoEtapaIds },
        });

        if (!requerimientos.length) {
            return res.status(404).json({ message: "No se encontraron requerimientos" });
        }

        const requerimientoIds = requerimientos.map((req) => req.id);

        // 3. Buscar los requerimientos_habilidad junto con habilidad, requerimiento y nivel
        const requerimientosHabilidad = await RequerimientoHabilidad.findAll({
            where: {
                id_requerimiento: requerimientoIds,
                id_desarrollador: idDesarrollador,
            },
            include: [
                {
                    model: Habilidad,
                    attributes: ["nombre", "descripcion"],
                    as: "habilidad",
                },
                {
                    model: Requerimiento,
                    attributes: ["nombre", "descripcion"],
                    as: "requerimiento",
                },
                {
                    model: Nivel,
                    attributes: ["nombre"],
                    as: "nivel",
                },
            ],
        });

        // 4. Armar la respuesta con los datos solicitados
        const resultado = requerimientosHabilidad.map((rh) => {
            const requerimiento = requerimientos.find(
                (req) => req.id === rh.id_requerimiento
            );
            const proyectoEtapa = proyectoEtapas.find(
                (pe) => pe.id === requerimiento.id_proyecto_etapa
            );

            return {
              id: rh.id,
                nombreRequerimiento: rh.requerimiento?.nombre || "Requerimiento no encontrado",
                descripcionRequerimiento: rh.requerimiento?.descripcion || "Descripción no encontrada",
                nombreHabilidad: rh.habilidad?.nombre || "Habilidad no encontrada",
                descripcionHabilidad: rh.habilidad?.descripcion || "Descripción no encontrada",
                nombreNivel: rh.nivel?.nombre || "Nivel no encontrado",
                nombreEtapa: proyectoEtapa?.etapa?.nombre || "Etapa no encontrada",
                terminado: rh.terminado,
            };
        });

        res.status(200).json(resultado);
    } catch (error) {
        console.error(
            "Error al obtener requerimientos habilidad por desarrollador:",
            error
        );
        res.status(500).json({
            message: "Error al obtener los requerimientos habilidad",
            error,
        });
    }
},
async toggleTerminado(req, res) {
  const { id } = req.params;

  try {
    // Buscar el requerimiento habilidad por ID
    const requerimientoHabilidad = await RequerimientoHabilidad.findByPk(id);

    if (!requerimientoHabilidad) {
      return res.status(404).json({ message: "Requerimiento habilidad no encontrado" });
    }

    // Alternar el valor de 'terminado'
    const nuevoEstado = !requerimientoHabilidad.terminado;
    await requerimientoHabilidad.update({ terminado: nuevoEstado });

    res.status(200).json({
      message: `Requerimiento habilidad actualizado a ${nuevoEstado ? "terminado" : "no terminado"}`,
      terminado: nuevoEstado,
    });
  } catch (error) {
    console.error("Error al alternar el estado de terminado:", error);
    res.status(500).json({
      message: "Error al alternar el estado de terminado",
      error,
    });
  }
},
};

module.exports = RequerimientoHabilidadController;
