const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js');
const Cliente = require('./Cliente'); // Importa el modelo Cliente
const Equipo = require('./Equipo'); // Importa el modelo Equipo

class Proyecto extends Model {}
// init ( atributos , opcion  )
Proyecto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  duracion_estimada: {
    type: DataTypes.DATE,
    allowNull: true
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'id'
    }
  },
  id_equipo: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Equipo,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Proyecto',
  tableName: 'proyecto',
  timestamps: false // Asumiendo que no necesitas campos createdAt y updatedAt
});

// Definir las relaciones
Proyecto.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Proyecto.belongsTo(Equipo, { foreignKey: 'id_equipo' });

// Si necesitas relaciones inversas, puedes agregarlas así:
// Cliente.hasMany(Proyecto, { foreignKey: 'id_cliente' });
// Equipo.hasMany(Proyecto, { foreignKey: 'id_equipo' });

module.exports = Proyecto;