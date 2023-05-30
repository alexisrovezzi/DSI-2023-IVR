/*

atributos:
encuestaId
descripcion
fechaFinVigencia

metodos:
esEncuestaDeCliente()
esVigente()
getDescripcionEncuesta()
obtenerPreguntas()

*/
import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';
import * as pregunta from './pregunta.js';

const Encuesta = sequelize.define(
    "Encuestas",
    {
        encuestaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaFinVigencia: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false
    }
);

async function esVigente(encuestaId) {
    Encuesta.findOne({
        where: {
            encuestaId: encuestaId
        }
    })
        .then((encuesta) => {
            return encuesta.fechaFinVigencia === null;
        })
        .catch((error) => {
            console.log(error);
        });
}
async function getDescripcion(encuestaId) {
    Encuesta.findOne({
        where: {
            encuestaId: encuestaId
        }
    })
        .then((encuesta) => {
            return encuesta?.descripcion;
        })
        .catch((error) => {
            console.log(error);
        });
}
async function obtenerPreguntas(encuestaId) {
    const response = [];
    pregunta.Pregunta.findAll({
        where: {
            encuestaId: encuestaId
        }
    }).then(async (preguntas) => {
        for (const preguntaItem of preguntas) {
            const preguntaDatos = {
                preguntaId: preguntaItem.preguntaId,
                descripcion: await pregunta.getDescripcion(preguntaItem.preguntaId)
            }
            response.push(preguntaDatos);
        }

    }).catch((error) => {
        console.log(error);
    });
    return response;
}
async function esEncuestaDeCliente(idRespuestasPosibles) {
    Encuesta.findAll()
        .then(async (encuestas) => {
            for (const encuesta of encuestas) {
                const payload = { encuestaId: encuesta.encuestaId, respuestasDeClientePosiblesId: idRespuestasPosibles };
                let esEncuestaDeClienteBandera = await pregunta.esEncuestaDeCliente(payload);
                if (esEncuestaDeClienteBandera) {
                    return encuesta.encuestaId;
                    break;
                }
            }
            return -1;
        })
        .catch((error) => {
            console.log(error);
        });
}



export { esVigente, getDescripcion, obtenerPreguntas, esEncuestaDeCliente }
