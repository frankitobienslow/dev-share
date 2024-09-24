const db = require('../db'); // Conexión a la base de datos
const { DataTypes } = require('sequelize');

// Definimos el modelo Nivel
const Nivel = db.define('Nivel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false, // El nombre no puede ser nulo
  },
}, {
  tableName: 'nivel', // Nombre de la tabla
  timestamps: false,  // No necesitamos createdAt ni updatedAt
});

module.exports = Nivel;