const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

class Etapa extends Model {}

Etapa.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Etapa',
  tableName: 'etapa',
  timestamps: false,
});

module.exports = Etapa;