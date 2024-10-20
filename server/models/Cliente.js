const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db.js"); // Asegúrate de que la ruta sea correcta
const Usuario = require("./Usuario"); // Importar el modelo Usuario

class Cliente extends Model {}

Cliente.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // El id ya no es autoIncrement, ya que es una clave foránea de Usuario
    },
    // Otros campos específicos de Cliente
  },
  {
    sequelize,
    modelName: "Cliente",
    tableName: "cliente",
    timestamps: false,
  }
);

// Relacionar Cliente con Usuario
Cliente.belongsTo(Usuario, { foreignKey: "id", onDelete: "RESTRICT" });
Cliente.associate = (models) => {
  // Un cliente puede tener muchos proyectos
  Cliente.hasMany(models.Proyecto, { foreignKey: "id_cliente" });
};

module.exports = Cliente;
