const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importa tu configuración de Sequelize

const Feedback = sequelize.define('Feedback', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true, // Puede ser NULL si lo deseas
  },
}, {
  tableName: 'feedback', // Nombre de la tabla en tu base de datos
  timestamps: false, // Si no quieres campos de timestamps (createdAt, updatedAt)
});

module.exports = Feedback;