const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de que esta ruta es correcta
const Desarrollador = require('./Desarrollador'); // Importa el modelo Desarrollador
const EquipoDesarrollador = require('./EquipoDesarrollador'); // Importa la tabla intermedia

class Equipo extends Model {}

Equipo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  sequelize,  // Asegúrate de que se está pasando la instancia aquí
  modelName: 'Equipo',
  tableName: 'equipo',
  timestamps: false, // No necesitamos createdAt ni updatedAt en esta tabla
});

// Relación de muchos a muchos entre Equipo y Desarrollador a través de la tabla intermedia
Equipo.belongsToMany(Desarrollador, {
    through: EquipoDesarrollador,  // Tabla intermedia
    foreignKey: 'id_equipo',       // Llave foránea que apunta a `Equipo`
    otherKey: 'id_desarrollador',  // Llave foránea que apunta a `Desarrollador`
    as: 'desarrolladores'           // Asegúrate de definir el alias aquí
  });

module.exports = Equipo;