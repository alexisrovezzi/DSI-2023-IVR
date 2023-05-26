/*

atributos:
estadoId
nombre

metodos:
esFinalizada()
esInicial()
getNombre()

*/

import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';

const Estado = sequelize.define(
    "Estados",
    {
        estadoId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
    }
);
async function esInicial(estadoId) {
    Estado.findOne({
        where: {
            estadoId: estadoId,
        }
      })
      .then((estado) => {
        return estado?.nombre === "Iniciado";
      })
      .catch((error) => {
        console.log(error);
      });
}
async function getNombre(estadoId) {
    Estado.findOne({
        where: {
            estadoId: estadoId,
        }
      })
      .then((estado) => {
        return estado?.nombre ?? "Undefined";
      })
      .catch((error) => {
        console.log(error);
      });
}




export { getNombre, esInicial }