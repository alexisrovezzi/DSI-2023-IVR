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

async function esEncuestaDeCliente() {
    // llamar a respuestas posibles y comparar con las respuestas de cliente
};

async function tieneRespuestasPosibles() {
    // supongo que este metodo debe devolver los punteros de las respuestas posibles
};

export { getDescripcion, esEncuestaDeCliente, tieneRespuestasPosibles }