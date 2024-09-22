const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js'); // Asegúrate de que la ruta sea correcta
const Usuario = require('./Usuario'); // Importar el modelo Usuario

class Cliente extends Model {}

Cliente.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Otros campos específicos de Cliente
}, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'cliente',
    timestamps:false
});

// Aquí puedes establecer la relación si es necesario
Cliente.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Cliente;