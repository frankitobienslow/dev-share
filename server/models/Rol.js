const db = require('../db'); // Conexión a la base de datos
const { DataTypes } = require('sequelize');

// Definimos el modelo Rol
const Rol = db.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // No permitir nulos
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true, // Puede ser nulo
  },
}, {
  tableName: 'rol', // Nombre de la tabla en la base de datos
  timestamps: false, // No necesitamos createdAt ni updatedAt
});

module.exports = Rol;