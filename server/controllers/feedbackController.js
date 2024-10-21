const Feedback = require('../models/Feedback');

// Obtener todos los tipos de feedback (las descripciones)
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los feedbacks', error });
  }
};

// Obtener un tipo de feedback por ID
const getFeedbackById = async (req, res) => {
  const { id } = req.params;
  try {
    const feedback = await Feedback.findByPk(id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ message: 'Feedback no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el feedback', error });
  }
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
};