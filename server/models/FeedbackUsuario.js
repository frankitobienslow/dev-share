const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Importa tu configuración de Sequelize
const Usuario = require('./Usuario'); // Importa tu modelo de usuario
const Feedback = require('./Feedback'); // Importa el modelo de feedback

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
    allowNull: true, // Campo opcional para el comentario
  },
}, {
  tableName: 'feedback_usuario',
  timestamps: false, // Si no quieres campos de timestamps (createdAt, updatedAt)
});

// Establecer las relaciones entre las tablas
FeedbackUsuario.belongsTo(Feedback, { foreignKey: 'id_feedback' });
FeedbackUsuario.belongsTo(Usuario, { foreignKey: 'id_autor', as: 'Autor' });
FeedbackUsuario.belongsTo(Usuario, { foreignKey: 'id_destino', as: 'Destino' });

module.exports = FeedbackUsuario;