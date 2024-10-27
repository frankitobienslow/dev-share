const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db"); // Asegúrate de que esta línea sea correcta
const ProyectoEtapa = require("./ProyectoEtapa"); // Asegúrate de tener este modelo

class Requerimiento extends Model {}

Requerimiento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    id_proyecto_etapa: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'proyectoEtapa',
        key: "id",
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Requerimiento",
    tableName: "requerimiento",
    timestamps: false,
  }
);

// Definir la relación con ProyectoEtapa
Requerimiento.belongsTo(ProyectoEtapa, { foreignKey: "id_proyecto_etapa" });

module.exports = Requerimiento;