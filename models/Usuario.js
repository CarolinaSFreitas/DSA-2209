import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Usuario = sequelize.define('usuario', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false
  }
}, {
  timestamps: false
});
