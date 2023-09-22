import { DataTypes } from "sequelize";
import { sequelize } from '../database/conecta.js'

export const Marca = sequelize.define('Marcas', { // nome da tabela
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
}, {
    timestamps: false
});
