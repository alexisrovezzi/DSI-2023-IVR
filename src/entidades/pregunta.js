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
    Pregunta.findOne({
        where: {
            preguntaId: preguntaId
        }
    })
        .then((pregunta) => {
            return pregunta?.pregunta ?? "Undefined";
        })
        .catch((error) => {
            console.log(error);
        });
}

async function esEncuestaDeCliente(params) {
    await Pregunta.findAll({
        where: {
            encuestaId: params.encuestaId
        }
    })
        .then(async (preguntas) => {
            for (const pregunta of preguntas) {
                const idRespuestasPosibles = await tieneRespuestasPosibles(pregunta.preguntaId);
                const esEncuestaDeCliente =  params.respuestasDeClientePosiblesId.some(x => idRespuestasPosibles.includes(x))
                return esEncuestaDeCliente;
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

async function tieneRespuestasPosibles(preguntaId) {
    await respuestaPosible.RespuestaPosible.findAll({
        where: {
            preguntaId: preguntaId
        }
    })
        .then((respuestasPosibles) => {
            return respuestasPosibles.map(x => x.respuestaPosibleId);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {Pregunta, getDescripcion, esEncuestaDeCliente, tieneRespuestasPosibles }