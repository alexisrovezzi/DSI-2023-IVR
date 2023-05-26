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
    // Pregunta.obtenerPreguntas(encuestaId);
    // return Pregunta.obtenerPreguntas(encuestaId);
}
async function esEncuestaDeCliente(encuestaId) {
    // Pregunta.esEncuestaDeCliente(payload) 
}



export { esVigente, getDescripcion, obtenerPreguntas, esEncuestaDeCliente }
