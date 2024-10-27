const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Proyecto = require("./Proyecto");
const Etapa = require("./Etapa");

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
            model: Proyecto,
            key: 'id',
        },
    },
    id_etapa: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Etapa,
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
    sequelize,
    modelName: 'ProyectoEtapa',
    tableName: 'proyecto_etapa',
    timestamps: false,
});

// Definir las relaciones
ProyectoEtapa.belongsTo(Proyecto, { foreignKey: 'id_proyecto', as: 'proyecto' });
ProyectoEtapa.belongsTo(Etapa, { foreignKey: 'id_etapa', as: 'etapa' });

// Agregar la relación inversa en el modelo Proyecto
Proyecto.hasMany(ProyectoEtapa, { foreignKey: 'id_proyecto', as: 'proyectoEtapas' });

module.exports = ProyectoEtapa;