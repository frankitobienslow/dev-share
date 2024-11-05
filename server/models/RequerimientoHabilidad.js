const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Habilidad = require('./Habilidad');
const Nivel = require('./Nivel');
const Requerimiento=require('./Requerimiento')

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
      model: 'requerimiento',
      key: 'id',
    },
  },
  id_habilidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'habilidad',
      key: 'id',
    },
  },
  id_nivel: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'nivel',
      key: 'id',
    },
  },
}, {
  tableName: 'requerimiento_habilidad',
  timestamps: false,
});

// Definir todas las asociaciones en una sola función
RequerimientoHabilidad.associate = (models) => {
  RequerimientoHabilidad.belongsTo(models.Habilidad, {
    foreignKey: 'id_habilidad',
    as: 'habilidad',
  });
  RequerimientoHabilidad.belongsTo(models.Nivel, {
    foreignKey: 'id_nivel',
    as: 'nivel',
  });
  RequerimientoHabilidad.belongsTo(models.Requerimiento, {
    foreignKey: 'id_requerimiento',
    as: 'requerimiento',
  });
  // Asegúrate de incluir aquí cualquier otra asociación necesaria
};




module.exports = RequerimientoHabilidad;