const FeedbackUsuario = require('../models/FeedbackUsuario');
const Usuario = require('../models/Usuario');
const Feedback = require('../models/Feedback');

// Crear un nuevo feedback de usuario
const createFeedbackUsuario = async (req, res) => {
  const { id_feedback, id_autor, id_destino, detalle } = req.body;

  if (!id_feedback || !id_autor || !id_destino) {
    return res.status(400).json({ message: 'Datos incompletos para crear el feedback' });
  }

  try {
    const nuevoFeedbackUsuario = await FeedbackUsuario.create({
      id_feedback,
      id_autor,
      id_destino,
      detalle,
      fecha: new Date(), // Asigna la fecha actual
    });
    res.status(201).json(nuevoFeedbackUsuario);
  } catch (error) {
    console.error("Error al crear el feedback de usuario:", error);
    res.status(500).json({ message: 'Error al crear el feedback de usuario', error });
  }
};

// Obtener feedbacks por usuario destino
const getFeedbacksByDestino = async (req, res) => {
  const { id_destino } = req.params;

  try {
    const feedbacks = await FeedbackUsuario.findAll({
      where: { id_destino },
      include: [
        { model: Feedback, attributes: ['descripcion'] },
        { model: Usuario, as: 'Autor', attributes: ['nombre'] },
      ],
    });

    if (feedbacks.length > 0) {
      res.status(200).json(feedbacks);
    } else {
      res.status(404).json({ message: 'No se encontraron feedbacks para el usuario destino' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener feedbacks', error });
  }
};

module.exports = {
  createFeedbackUsuario,
  getFeedbacksByDestino,
};