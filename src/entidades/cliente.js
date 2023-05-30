/*

atributos:
clienteId
dni
nombreCompleto
nroCelular

metodos:
getNombre()
esCliente()

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
        timestamps: false
    }
);

async function getNombre(clienteId){
    Cliente.findOne({
        where: {
          clienteId: clienteId
        }
      })
      .then((cliente) => {
        return cliente?.nombreCompleto ?? "Undefined";
      })
      .catch((error) => {
        console.log(error);
      });
}



export {getNombre}