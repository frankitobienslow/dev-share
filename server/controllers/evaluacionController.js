const Evaluacion = require('../models/Evaluacion');

// Obtener todas las evaluaciones
exports.getAllEvaluaciones = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.findAll();
    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las evaluaciones' });
  }
};

// Obtener una evaluación por ID
exports.getEvaluacionById = async (req, res) => {
  const { id } = req.params;
  try {
    const evaluacion = await Evaluacion.findByPk(id);
    if (evaluacion) {
      res.status(200).json(evaluacion);
    } else {
      res.status(404).json({ error: 'Evaluación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la evaluación' });
  }
};

// Crear una nueva evaluación
exports.createEvaluacion = async (req, res) => {
  const { id_desarrollador, id_habilidad, id_nivel, resultado, fecha } = req.body;
  try {
    const nuevaEvaluacion = await Evaluacion.create({
      id_desarrollador,
      id_habilidad,
      id_nivel,
      resultado,
      fecha,
    });
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    console.error('Error al crear la evaluación:', error);
    res.status(500).json({ error: 'Error al crear la evaluación', details: error.message });
  }
};
