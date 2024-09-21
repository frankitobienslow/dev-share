const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('devshare-db', 'tu_usuario', 'tu_contraseña', {
    host: 'localhost',
    dialect: 'mysql'
});

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
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: false // Cambia esto si usas createdAt/updatedAt
});

module.exports = Usuario;