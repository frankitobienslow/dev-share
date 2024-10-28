const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Habilidad extends Model {}

Habilidad.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'rol',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Habilidad',
  tableName: 'habilidad',
  timestamps: false,
});

Habilidad.associate = (models) => {
  Habilidad.hasMany(models.RequerimientoHabilidad, {
    foreignKey: 'id_habilidad',
    as: 'requerimientosHabilidad',
  });
};

module.exports = Habilidad;