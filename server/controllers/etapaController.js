const  Etapa  = require('../models/Etapa'); // Importa el modelo de Etapa
//const  {Etapa}  = require('../models/Etapa'); // Importa el modelo de Etapa


const etapaController = {
  // Obtener todos los etapas
  obtenerEtapa: async (req, res) => {
    try {
      const etapas = await Etapa.findAll();
      res.json(etapas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los etapas.' });
    }
  },

  // Obtener un etapa por ID
  obtenerEtapaPorId: async (req, res) => {
    try {
      let etapa;
      const { id } = req.params;
      if(/^\d+$/.test(id)){
         etapa = await Etapa.findByPk(id);
      }
      else{
        console.log(id);
        etapa = await Etapa.findOne({where:{nombre:id}})
      }
      if (!etapa) {
        return res.status(404).json({ error: 'Etapa no encontrado.' });
      }
      res.json(etapa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener la etapa.' });
    }
  },

  // Crear un etapa
  crearEtapa: async (req, res) => {
    try {
      const { nombresEtapas } = req.body;
      if(!Array.isArray(nombresEtapas)){
        return (res.status(400).json({message:'Formato invalido de datos'}));
      }
      const resultados=[];
      for(const etapa of nombresEtapas){
        console.log(etapa.nombre);
        if(!etapa.nombre){
          return (res.status(400).json({message:'Cada etapa debe tener un nombreEtapa'}));
        }
        const nuevaEtapa = await Etapa.create({nombre:etapa.nombre});
        resultados.push(nuevaEtapa);
      }// fin for 
      res.status(201).json({message:'Etapas guardadas exitosamente',data:resultados});
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el etapa.' });
    }
  },

  // Actualizar un etapa
  actualizarEtapa: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombreEtapa } = req.body;
      const etapa = await Etapa.findByPk(id);
      if (!etapa) {
        return res.status(404).json({ error: 'Etapa no encontrado.' });
      }
      etapa.nombreEtapa = nombreEtapa;
      await etapa.save();
      res.json(etapa);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar el etapa.' });
    }
  },

  // Eliminar un etapa
  eliminarEtapa: async (req, res) => {
    try {
      const { id } = req.params;
      const etapa = await Etapa.findByPk(id);
      if (!etapa) {
        return res.status(404).json({ error: 'Etapa no encontrado.' });
      }
      await etapa.destroy();
      res.json({ message: 'Etapa eliminado correctamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el etapa.' });
    }
  },
};

module.exports = etapaController;