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
async function getDescripcionEncuesta(encuestaId) {
    let descripcion = "";
    await Encuesta.findOne({
        where: {
            encuestaId: encuestaId
        }
    })
        .then((encuesta) => {
            descripcion = encuesta?.descripcion;
        })
        .catch((error) => {
            console.log(error);
        });
    return descripcion;
}
async function obtenerPreguntas(encuestaId, punterosRespuestasPosibles) {
    const datosPreguntas = [];
    await pregunta.Pregunta.findAll({
        where: {
            encuestaId: encuestaId
        }
    }).then(async (preguntas) => {
        for (const preguntaItem of preguntas) {
            const respuestaPosibleId = await pregunta.tieneRespuestasPosibles(preguntaItem.preguntaId, punterosRespuestasPosibles)
            if (respuestaPosibleId > 0 ) {
                const preguntaDatos = {
                    respuestaPosibleId: respuestaPosibleId,
                    preguntaId: preguntaItem.preguntaId,
                    descripcion: await pregunta.getDescripcion(preguntaItem.preguntaId),
                }
                datosPreguntas.push(preguntaDatos);
            }
        }

    }).catch((error) => {
        console.log(error);
    });
    return datosPreguntas;
}
async function esEncuestaDeCliente(fechaEncuesta) {
    let encuestaDelCliente = null;
    await Encuesta.findAll()
        .then(async (encuestas) => {
            let encuestasCnMayoresFinVigencias = [];
            for (const encuesta of encuestas) {
                if ((new Date(encuesta.fechaFinVigencia)) >= (new Date(fechaEncuesta))) encuestasCnMayoresFinVigencias.push(encuesta.fechaFinVigencia);
            }
            let fechaMasAntigua = new Date(Math.min.apply(null, encuestasCnMayoresFinVigencias));
            encuestaDelCliente = encuestas.find((x) => { return (x.fechaFinVigencia.toString()) === (fechaMasAntigua.toString()) })
        })
        .catch((error) => {
            console.log(error);
        });
    return encuestaDelCliente;
}



export { esVigente, getDescripcionEncuesta, obtenerPreguntas, esEncuestaDeCliente }
