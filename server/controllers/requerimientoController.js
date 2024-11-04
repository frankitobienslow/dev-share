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
exports.getAllReqByEtapas = async(req,res)=>{
  try{
    const {id_proyecto_etapa} = req.query;
    const requerimientos = await Requerimiento.findAll({
      where:{
        id_proyecto_etapa:id_proyecto_etapa
      }
    });
    res.json(requerimientos);

  }
  catch(error){
    res.status(500).json({message:"Error al obtener los requerimiento de la etapa"})
  }
}

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
    const newRequerimiento = await Requerimiento.create({ nombre, id_proyecto_etapa, descripcion, disponible });
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
    await requerimiento.update({ nombre, id_proyecto_etapa, descripcion, disponible });
    res.status(200).json(requerimiento);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar requerimiento", error });
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