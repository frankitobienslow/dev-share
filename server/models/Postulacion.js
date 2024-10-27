const { DataTypes } = require('sequelize');
const sequelize = require("../db.js"); // Asegúrate de que tienes la configuración de la base de datos
const Desarrollador = require('./Desarrollador'); // Asegúrate de que este modelo esté configurado
const RequerimientoHabilidad = require('./RequerimientoHabilidad'); // Asegúrate de que este modelo esté configurado

const Postulacion = sequelize.define('Postulacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_desarrollador: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Desarrollador,
            key: 'id'
        }
    },
    id_requerimiento_habilidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: RequerimientoHabilidad,
            key: 'id'
        }
    }
}, {
    tableName: 'postulacion',
    timestamps: false
});

module.exports = Postulacion;
