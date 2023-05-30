/*

atributos:
respuestaDeClienteId
fechaEncuesta
llamadaId
respuestaPosibleId

metodos:
obtenerDescripcionRespuesta()
getFechaEncuesta()


*/

import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';
import * as rp from './respuestaPosible.js';

const RespuestaDeCliente = sequelize.define(
    "RespuestasDeCliente",
    {
        respuestaDeClienteId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fechaEncuesta: {
            type: DataTypes.DATE,
            allowNull: false
        },
        respuestaPosibleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        llamadaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false
    }
);

async function getFechaEncuesta(respuestaDeClienteId) {
    RespuestaDeCliente.findOne({
        where: {
            respuestaDeClienteId: respuestaDeClienteId
        }
    })
        .then((respuestaDeCliente) => {
            return respuestaDeCliente?.fechaEncuesta;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function obtenerDescripcionRespuesta(respuestaPosibleId) {
    return await rp.getDescripcionRta(respuestaPosibleId)
}

async function obtenerDatosDeRespuestas(llamadaId) {
    let respuestasDeCliente = [];
    let respuestasDeClienteCnDatos = [];
    await RespuestaDeCliente.findAll({
        where: {
            llamadaId: llamadaId
        }
    })
        .then(async (respuestasDeClienteParam) => {
            respuestasDeCliente = respuestasDeClienteParam.map(x => { x.respuestaDeClienteId, respuestaPosibleId })

        })
        .catch((error) => {
            console.log(error);
        });

    for (const respuesta of respuestasDeCliente) {
        let respuestaCnFecha = respuesta;
        respuestaCnFecha.fechaEncuesta = await getFechaEncuesta(respuesta.respuestaDeClienteId);
        respuestaCnFecha.descripcionRta = await obtenerDescripcionRespuesta(respuesta.respuestaPosibleId);
        respuestasDeClienteCnDatos.push(respuestaCnFecha);
    }
    return respuestasDeClienteCnDatos;
}

export {RespuestaDeCliente, obtenerDescripcionRespuesta, getFechaEncuesta, obtenerDatosDeRespuestas }