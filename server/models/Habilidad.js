const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Ajusta la ruta según tu estructura

class Habilidad extends Model {}

Habilidad.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_rol: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'rol', // Asegúrate de que este nombre coincida con tu tabla
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Habilidad',
});

module.exports = Habilidad;