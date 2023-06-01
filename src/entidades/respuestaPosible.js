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
        timestamps: false
    }
);

async function getDescripcionRta(respuestaPosibleId) {
    let descripcionRTA = "";
    await RespuestaPosible.findOne({
        where: {
            respuestaPosibleId: respuestaPosibleId
        }
    })
        .then((respPosible) => {
            descripcionRTA = respPosible?.descripcion ?? "Undefined";
        })
        .catch((error) => {
            console.log(error);
        });
    return descripcionRTA;
}

export {RespuestaPosible, getDescripcionRta }