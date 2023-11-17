import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'
import { Marca } from "./Marca.js";

export const Vinho = sequelize.define('Vinhos', { // nome da tabela
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    tipo: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    },
    teor: {
        type: DataTypes.DECIMAL(9, 2),
        allowNull: false
    },
}, {
    // timestamps: false
    paranoid: true
});

// após construir a tabela do model, os relacionamentos são feitos fora:

Vinho.belongsTo(Marca, {
    foreignKey: {
        name: "marca_id",
        allowNull: false
    },
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
})

Marca.hasMany(Vinho, {
    foreignKey: "marca_id"
})

