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
        timestamps: false
    }
);
async function esFinalizada(estadoId) {
    let estadoEsFinalizada = false;
    await Estado.findOne({
        where: {
            estadoId: estadoId,
        }
      })
      .then((estado) => {
        estadoEsFinalizada = (estado?.nombre === "Finalizada");
      })
      .catch((error) => {
        console.log(error);
      });
    return estadoEsFinalizada;
}
async function getNombre(estadoId) {
    let nombreEstado = "";
    await Estado.findOne({
        where: {
            estadoId: estadoId,
        }
      })
      .then((estado) => {
        nombreEstado = estado?.nombre;
      })
      .catch((error) => {
        console.log(error);
      });
    return nombreEstado;
}




export { getNombre, esFinalizada }