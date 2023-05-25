/*

atributos:
clienteId
dni
nombreCompleto
nroCelular

metodos:
getNombre()

*/
import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';

const Cliente = sequelize.define(
    "Clientes",
    {
        clienteId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nombreCompleto: { 
            type: DataTypes.STRING, 
            allowNull: false
        },
        dni: { 
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        nroCelular: { 
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    },
    {
        sequelize,
    }
);

// Cliente.associate = (models) => {
//     Cliente.hasMany(models.LLamada, { foreignKey: 'clienteId' });
//   };

export {Cliente}