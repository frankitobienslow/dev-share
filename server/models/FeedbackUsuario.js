const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Usuario = require('./Usuario');
const Feedback = require('./Feedback');

const FeedbackUsuario = sequelize.define('FeedbackUsuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_feedback: {
    type: DataTypes.INTEGER,
    references: {
      model: Feedback,
      key: 'id',
    },
  },
  id_autor: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  id_destino: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  detalle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'feedback_usuario',
  timestamps: false,
});

FeedbackUsuario.belongsTo(Feedback, { foreignKey: 'id_feedback' });
FeedbackUsuario.belongsTo(Usuario, { foreignKey: 'id_autor', as: 'Autor' });
FeedbackUsuario.belongsTo(Usuario, { foreignKey: 'id_destino', as: 'Destino' });

module.exports = FeedbackUsuario;