const Nivel = require('../models/Nivel'); // Importamos el modelo Nivel

// Obtener todos los niveles
exports.getAllNiveles = async (req, res) => {
  try {
    const niveles = await Nivel.findAll();
    res.status(200).json(niveles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los niveles' });
  }
};

// Obtener un nivel por ID
exports.getNivelById = async (req, res) => {
  const { id } = req.params;
  try {
    const nivel = await Nivel.findByPk(id);
    if (nivel) {
      res.status(200).json(nivel);
    } else {
      res.status(404).json({ error: 'Nivel no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el nivel' });
  }
};
