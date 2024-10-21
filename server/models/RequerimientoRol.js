// models/RequerimientoRol.js
const { DataTypes } = require('sequelize');
const sequelize  = require('../db'); // Conexión a la base de datos

const RequerimientoRol = sequelize.define('RequerimientoRol', {
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
  cantidad_desarrolladores: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
}, {
  tableName: 'requerimiento_rol',
  timestamps: false, // Cambiar a true si deseas utilizar createdAt y updatedAt
});

module.exports = RequerimientoRol;
