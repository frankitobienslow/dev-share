const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db.js');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: { // Agregar campo email
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Asegúrate de que el email sea único
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: false // Cambia esto si usas createdAt/updatedAt
});

module.exports = Usuario;