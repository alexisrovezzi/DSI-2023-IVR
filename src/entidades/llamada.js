/*

atributos:
llamadaId
descripcionOperador
duracion
observacionAuditor
clienteId

metodos:
tieneEncuestaRespondida()
obtenerNombreCliente()
getEstadoActual()
getDuracion()
getRespuestas()

*/
import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';
import * as cambioEstado from './cambioEstado.js';
import * as cliente from './cliente.js';
import * as respuestaDeCliente from './respuestasDeCliente.js';

const Llamada = sequelize.define(
    "Llamadas",
    {
        llamadaId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        descripcionOperador: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duracion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        observacionAuditor: {
            type: DataTypes.STRING,
            allowNull: true
        },
        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

async function tieneEncuestaRespondida() {
    /* 
        tiene encuesta respondida deberia ver si posee punteros
     */
};
async function esDePeriodo(params){
    /* 
    deberia revisar si esta dentro del periodo que se manda por parametro
    */

};
async function obtenerNombreCliente(llamadaId) {
    Llamada.findOne({
        where: {
            llamadaId: llamadaId
        }
    })
        .then(async (llamada) => {
            return await cliente.getNombre(llamada.clienteId);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function getEstadoActual(llamadaId) {
    const ultimoCambioEstado = await cambioEstado.esUltimoEstado(llamadaId);
    return await cambioEstado.getNombreEstado(ultimoCambioEstado);
}
async function getDuracion(llamadaId) {
    Llamada.findOne({
        where: {
            llamadaId: llamadaId
        }
    })
        .then((llamada) => {
            return (llamada?.duracion ?? '0') + ' min';
        })
        .catch((error) => {
            console.log(error);
        });
}
async function getRespuestas(llamadaId) {
    await respuestaDeCliente.obtenerDatosDeRespuestas(llamadaId)
}

async function obtenerDatosGeneralesLlamada(llamadaId) {
    const response = {};
    response.cliente = cliente.getNombre(llamadaId);
    response.estadoActual = getEstadoActual(llamadaId);
    response.duracion = getDuracion(llamadaId);
    response.respuestas = await getRespuestas(llamadaId);
    return response;
 }

export {esDePeriodo, tieneEncuestaRespondida, obtenerNombreCliente, getEstadoActual, getDuracion, getRespuestas, obtenerDatosGeneralesLlamada }