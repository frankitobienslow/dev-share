const Rol = require('../models/Rol'); // Importamos el modelo Rol

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los roles' });
  }
};

// Obtener un rol por ID
exports.getRolById = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);
    if (rol) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el rol' });
  }
};
