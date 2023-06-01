/*

atributos:
preguntaId
pregunta
encuestaId

metodos:
getDescripcion()
esEncuestaDeCliente()
tieneRespuestasPosibles()

*/

import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';
import * as respuestaPosible from './respuestaPosible.js';

const Pregunta = sequelize.define(
    "Preguntas",
    {
        preguntaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        pregunta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        encuestaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false
    }
);

async function getDescripcion(preguntaId) {
    let descripcion = ""
    await Pregunta.findOne({
        where: {
            preguntaId: preguntaId
        }
    })
        .then((pregunta) => {
            descripcion = pregunta?.pregunta ?? "Undefined";
        })
        .catch((error) => {
            console.log(error);
        });
    return descripcion;
}

async function tieneRespuestasPosibles(preguntaId, punterosRespuestasPosiblesParam) {
    let punteroRespuestaPosibleDePregunta = -1;
    await respuestaPosible.RespuestaPosible.findAll({
        where: {
            preguntaId: preguntaId
        }
    })
        .then((respuestasPosibles) => {
            let punterosRespuestasPosiblesDePregunta = respuestasPosibles.map(x => x.respuestaPosibleId);
            punteroRespuestaPosibleDePregunta = punterosRespuestasPosiblesParam.filter(function (id) {
                return punterosRespuestasPosiblesDePregunta.includes(id);
            })[0];
        })
        .catch((error) => {
            console.log(error);
        });
    return punteroRespuestaPosibleDePregunta;

};

export { Pregunta, getDescripcion, tieneRespuestasPosibles }