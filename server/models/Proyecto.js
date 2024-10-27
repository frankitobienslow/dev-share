const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Cliente = require("./Cliente");
const Equipo = require("./Equipo");

class Proyecto extends Model {}

Proyecto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
    },
    id_equipo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Equipo,
        key: "id",
      },
    }
  },
  {
    sequelize,
    modelName: "Proyecto",
    tableName: "proyecto",
    timestamps: false,
  }
);

// Definir las relaciones
Proyecto.belongsTo(Cliente, { foreignKey: 'id_cliente' });
Proyecto.belongsTo(Equipo, { foreignKey: 'id_equipo' });

module.exports = Proyecto;