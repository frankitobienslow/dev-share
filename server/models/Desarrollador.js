const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.js'); // Asegúrate de que la ruta sea correcta
const Usuario = require('./Usuario'); // Importar el modelo Usuario

class Desarrollador extends Model {}

Desarrollador.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        // Ya no debe ser autoIncrement, porque es una clave foránea de Usuario
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

// Relacionar Desarrollador con Usuario
Desarrollador.belongsTo(Usuario, { foreignKey: 'id', onDelete: 'RESTRICT' });

module.exports = Desarrollador;