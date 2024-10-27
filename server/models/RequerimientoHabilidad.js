// models/RequerimientoHabilidad.js
const { DataTypes } = require('sequelize');
const sequelize  = require('../db'); // Conexión a la base de datos

const RequerimientoHabilidad = sequelize.define('RequerimientoHabilidad', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_requerimiento: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'requerimiento', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
  id_habilidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'habilidad', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'nivel', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
  id_desarrollador: { // Nueva columna
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'desarrollador', // Nombre de la tabla referenciada
      key: 'id',
    },
  },
}, {
  tableName: 'requerimiento_habilidad',
  timestamps: false, // Cambiar a true si deseas utilizar createdAt y updatedAt
});

module.exports = RequerimientoHabilidad;