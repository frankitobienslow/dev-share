const Requerimiento = require("../models/Requerimiento");

// Obtener todos los requerimientos
exports.getAllRequerimientos = async (req, res) => {
  try {
    const requerimientos = await Requerimiento.findAll();
    res.status(200).json(requerimientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener requerimientos", error });
  }
};

// obtencion de los requerimientos con el mismo ID proyecto etapa
exports.getAllReqByEtapas = async (req, res) => {
  try {
    const { id_proyecto_etapa } = req.query;
    const requerimientos = await Requerimiento.findAll({
      where: {
        id_proyecto_etapa: id_proyecto_etapa,
      },
    });
    res.json(requerimientos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los requerimiento de la etapa" });
  }
};

// Obtener un requerimiento por ID
exports.getRequerimientoById = async (req, res) => {
  try {
    const requerimiento = await Requerimiento.findByPk(req.params.id);
    if (!requerimiento) {
      return res.status(404).json({ message: "Requerimiento no encontrado" });
    }
    res.status(200).json(requerimiento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener requerimiento", error });
  }
};

// Crear un nuevo requerimiento
exports.createRequerimiento = async (req, res) => {
  try {
    const { nombre, id_proyecto_etapa, descripcion, disponible } = req.body;
    const newRequerimiento = await Requerimiento.create({
      nombre,
      id_proyecto_etapa,
      descripcion,
      disponible,
    });
    res.status(201).json(newRequerimiento);
  } catch (error) {
    res.status(500).json({ message: "Error al crear requerimiento", error });
  }
};

// Actualizar un requerimiento
exports.updateRequerimiento = async (req, res) => {
  try {
    const requerimiento = await Requerimiento.findByPk(req.params.id);
    if (!requerimiento) {
      return res.status(404).json({ message: "Requerimiento no encontrado" });
    }
    const { nombre, id_proyecto_etapa, descripcion, disponible } = req.body;
    await requerimiento.update({
      nombre,
      id_proyecto_etapa,
      descripcion,
      disponible,
    });
    res.status(200).json(requerimiento);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar requerimiento", error });
  }
};

// Eliminar un requerimiento
exports.deleteRequerimiento = async (req, res) => {
  try {
    const requerimiento = await Requerimiento.findByPk(req.params.id);
    if (!requerimiento) {
      return res.status(404).json({ message: "Requerimiento no encontrado" });
    }
    await requerimiento.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar requerimiento", error });
  }
};

exports.getOfertas = async (req, res) => {
  console.log("HOLA"); // Para verificar si se entra en la función
  try {
    // 1. Buscar requerimientos donde disponible sea true
    const reqDispo = await Requerimiento.findAll({
      where: { disponible: true },
    });

    if (reqDispo.length === 0) {
      return res.status(404).json({ message: 'No se encontraron requerimientos disponibles' });
    }
    console.log('Requerimientos disponibles:', reqDispo);

    // Obtener los ids de proyecto_etapa de los requerimientos disponibles
    const proyectoEtapaIds = reqDispo.map((req) => req.id_proyecto_etapa);
    console.log('IDs de Proyecto Etapa:', proyectoEtapaIds);

    // 2. Buscar proyecto_etapa usando los IDs obtenidos
    const proyectoEtapas = await ProyectoEtapa.findAll({
      where: { id: proyectoEtapaIds },
    });

    if (proyectoEtapas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron etapas de proyecto para los requerimientos disponibles' });
    }
    console.log('Proyecto Etapas encontradas:', proyectoEtapas);

    // Crear un diccionario para agrupar los requerimientos por id_proyecto_etapa
    const requerimientosPorEtapa = {};
    reqDispo.forEach((req) => {
      if (!requerimientosPorEtapa[req.id_proyecto_etapa]) {
        requerimientosPorEtapa[req.id_proyecto_etapa] = [];
      }
      requerimientosPorEtapa[req.id_proyecto_etapa].push(req);
    });
    console.log('Requerimientos por etapa:', requerimientosPorEtapa);

    // Obtener los ids de proyecto de los proyectoEtapas encontrados
    const proyectoIds = proyectoEtapas.map((pe) => pe.id_proyecto);
    console.log('IDs de Proyectos:', proyectoIds);

    // 3. Buscar proyectos usando los IDs obtenidos
    const arrProyectos = await Proyecto.findAll({
      where: { id: proyectoIds },
    });

    if (arrProyectos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron proyectos relacionados' });
    }
    console.log('Proyectos encontrados:', arrProyectos);

    // Crear el JSON final estructurado
    const proyectosConRequerimientos = arrProyectos.map((proyecto) => {
      // Obtener las etapas de este proyecto y sus requerimientos
      const etapasProyecto = proyectoEtapas.filter(
        (pe) => pe.id_proyecto === proyecto.id
      );

      // Agregar todos los requerimientos de las etapas del proyecto
      const requerimientosDisponibles = etapasProyecto.flatMap(
        (etapa) => requerimientosPorEtapa[etapa.id] || []
      );

      // Devolver el proyecto con los requerimientos disponibles
      return {
        id: proyecto.id,
        titulo: proyecto.titulo,
        descripcion: proyecto.descripcion,
        id_cliente: proyecto.id_cliente,
        id_equipo: proyecto.id_equipo,
        requerimientosDisponibles: requerimientosDisponibles.map((req) => ({
          id: req.id,
          nombre: req.nombre,
          id_proyecto_etapa: req.id_proyecto_etapa,
          descripcion: req.descripcion,
          disponible: req.disponible,
        })),
      };
    });

    console.log('Proyectos con requerimientos:', proyectosConRequerimientos);
    res.status(200).json(proyectosConRequerimientos);
  } catch (error) {
    console.error("Error en getOfertas:", error);
    res.status(500).json({ message: "Error al obtener ofertas", error });
  }
};
