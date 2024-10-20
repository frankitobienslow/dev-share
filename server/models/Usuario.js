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
        allowNull: false,
        unique: true // Asegúrate de que el DNI sea único también
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
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

// Agregar asociaciones
Usuario.associate = (models) => {
    // Asociación uno a uno con Cliente
    Usuario.hasOne(models.Cliente, {
        foreignKey: 'id', // Suponiendo que el id del Usuario es la clave primaria en Cliente
        as: 'cliente' // Puedes cambiar el alias si lo deseas
    });

    // Asociación uno a uno con Desarrollador
    Usuario.hasOne(models.Desarrollador, {
        foreignKey: 'id', // Suponiendo que el id del Usuario es la clave primaria en Desarrollador
        as: 'desarrollador' // Puedes cambiar el alias si lo deseas
    });
};

module.exports = Usuario;