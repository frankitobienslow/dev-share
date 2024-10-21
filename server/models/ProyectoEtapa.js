// models/ProyectoEtapa.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Asegúrate de importar tu instancia de Sequelize

const ProyectoEtapa = sequelize.define('ProyectoEtapa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_proyecto: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'proyecto', // nombre de la tabla referenciada
            key: 'id',
        },
    },
    id_etapa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'etapa', // nombre de la tabla referenciada
            key: 'id',
        },
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'proyecto_etapa',
    timestamps: false, // Cambia esto si tienes campos de createdAt y updatedAt
});

module.exports = ProyectoEtapa;
