const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js'); // Asegúrate de que la ruta sea correcta
const Usuario = require('./Usuario'); // Importar el modelo Usuario

class Desarrollador extends Model {}

Desarrollador.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Por defecto, el desarrollador está activo
    },
    // Otros campos específicos de Desarrollador
}, {
    sequelize,
    modelName: 'Desarrollador',
    tableName: 'desarrollador',
    timestamps: false // Asegúrate de que esté correcto
});

Desarrollador.belongsTo(Usuario, { foreignKey: 'id_usuario' });

module.exports = Desarrollador;