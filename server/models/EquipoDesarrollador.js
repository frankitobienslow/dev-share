const { DataTypes } = require('sequelize');
const db = require('../db'); // Conexión a la base de datos
const Desarrollador = require("./Desarrollador");

const EquipoDesarrollador = db.define('EquipoDesarrollador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_desarrollador: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Desarrollador',  // Nombre del modelo relacionado
      key: 'id',
    },
    onDelete: 'CASCADE',  // En caso de eliminar el desarrollador, elimina la relación
  },
  id_equipo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Equipo',  // Nombre del modelo relacionado
      key: 'id',
    },
    onDelete: 'CASCADE',  // En caso de eliminar el equipo, elimina la relación
  },
  activo: { // Nueva columna booleana
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Valor por defecto
  },
}, {
  tableName: 'equipo_desarrollador',
  timestamps: false,  // No tenemos campos createdAt o updatedAt
});

// Relación con Desarrollador
EquipoDesarrollador.belongsTo(Desarrollador, {
  foreignKey: 'id_desarrollador',
  as: 'Desarrollador', // Alias que usarás al hacer eager loading
});

module.exports = EquipoDesarrollador;