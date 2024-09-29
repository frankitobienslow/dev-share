const db = require('../db'); // Conexión a la base de datos
const { DataTypes } = require('sequelize');

// Definimos el modelo Evaluacion
const Evaluacion = db.define('Evaluacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_desarrollador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Desarrollador', // Nombre del modelo referenciado
      key: 'id',
    },
  },
  id_habilidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Habilidad', // Nombre del modelo referenciado
      key: 'id',
    },
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Nivel', // Nombre del modelo referenciado
      key: 'id',
    },
  },
  resultado: {
    type: DataTypes.INTEGER,
  },
  fecha: {
    type: DataTypes.DATEONLY, // Solo la fecha sin la hora
  },
}, {
  tableName: 'evaluacion', // Nombre de la tabla
  timestamps: false,       // No usamos createdAt ni updatedAt
});

module.exports = Evaluacion;