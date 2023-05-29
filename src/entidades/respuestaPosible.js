/*

atributos:
respuestaPosibleId
descripcion
valor
preguntaId


metodos:
esRespuestaSeleccionada()
getDescripcionRta()
*/
import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';

const RespuestaPosible = sequelize.define(
    "RespuestasPosibles",
    {
        respuestaPosibleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preguntaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

async function getDescripcionRta(respuestaPosibleId) {
    RespuestaPosible.findOne({
        where: {
            respuestaPosibleId: respuestaPosibleId
        }
    })
        .then((respPosible) => {
            return respPosible?.descripcion ?? "Undefined";
        })
        .catch((error) => {
            console.log(error);
        });
}

export {RespuestaPosible, getDescripcionRta }