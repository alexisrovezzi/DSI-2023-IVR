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
import * as respuestaPosible from './respuestaPosible.js';

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
    let fechaEncuesta = "";
    await RespuestaDeCliente.findOne({
        where: {
            respuestaDeClienteId: respuestaDeClienteId
        }
    })
        .then((respuestaDeCliente) => {
            fechaEncuesta = respuestaDeCliente?.fechaEncuesta;
        })
        .catch((error) => {
            console.log(error);
        });
    return fechaEncuesta;
}

async function obtenerDescripcionRespuesta(respuestaPosibleId) {
    return await respuestaPosible.getDescripcionRta(respuestaPosibleId)
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
            respuestasDeCliente = respuestasDeClienteParam.map((x) => { return { respuestaDeClienteId: x.respuestaDeClienteId, respuestaPosibleId: x.respuestaPosibleId } })
        })
        .catch((error) => {
            console.log(error);
        });
    for (const respuestaCliente of respuestasDeCliente) {
        let respuestaCnDatos = respuestaCliente;
        respuestaCnDatos.fechaEncuesta = await getFechaEncuesta(respuestaCliente.respuestaDeClienteId);
        respuestaCnDatos.descRespuesta = await obtenerDescripcionRespuesta(respuestaCliente.respuestaPosibleId);
        respuestasDeClienteCnDatos.push(respuestaCnDatos);
    }
    return respuestasDeClienteCnDatos;
}

export { RespuestaDeCliente, obtenerDescripcionRespuesta, getFechaEncuesta, obtenerDatosDeRespuestas }