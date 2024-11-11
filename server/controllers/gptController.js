const Evaluacion = require('../models/Evaluacion');
const Habilidad = require('../models/Habilidad');
const Nivel = require('../models/Nivel');
const openaiService = require('../services/openaiService');
const cache = require('../services/cacheService'); // Servicio de almacenamiento temporal

// Generar y almacenar preguntas
exports.generateQuestions = async (req, res) => {
  const { id } = req.body; // ID del test

  try {
    const evaluacion = await Evaluacion.findByPk(id); // Obtener evaluación por ID
    if (!evaluacion) return res.status(404).json({ error: 'Evaluación no encontrada' });

    const habilidad = await Habilidad.findByPk(evaluacion.id_habilidad);
    const nivel = await Nivel.findByPk(evaluacion.id_nivel);

    // Llama al servicio de OpenAI para generar las preguntas
    const preguntas = await openaiService.generateQuestions(habilidad.nombre, nivel.nombre);

    // Almacenar las preguntas temporalmente en cache con el ID del test
    cache.store(id, preguntas);

    // Devolver las preguntas al frontend
    res.status(200).json({ preguntas });
  } catch (error) {
    console.error('Error al generar preguntas:', error);
    res.status(500).json({ error: 'Error al generar preguntas' });
  }
};

exports.validateAnswers = async (req, res) => {
    const { id, respuestasUsuario } = req.body; // ID del test y respuestas del usuario
  
    try {
      const preguntas = cache.retrieve(id); // Recuperamos las preguntas almacenadas en caché
      if (!preguntas) return res.status(404).json({ error: 'Preguntas no encontradas' });
  
      let puntaje = 0;
      preguntas.forEach((pregunta, index) => {
        if (pregunta.correcta === respuestasUsuario[index]) {
          puntaje += 12.5; // Asignar 20 puntos por cada respuesta correcta
        }
      });
  
      // Actualizar el resultado de la evaluación
      const evaluacion = await Evaluacion.findByPk(id);
      evaluacion.resultado = puntaje;
      evaluacion.fecha = new Date();
      await evaluacion.save();
  
      // Eliminar las preguntas del caché
      cache.remove(id);
  
      res.status(200).json({ puntaje });
    } catch (error) {
      console.error('Error al validar respuestas:', error);
      res.status(500).json({ error: 'Error al validar respuestas' });
    }
  };