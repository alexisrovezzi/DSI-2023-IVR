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
        detalleAccionRequerida: {
            type: DataTypes.STRING,
            allowNull: true
        },
        encuestaEnviada: {
            type: DataTypes.BOOLEAN,
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
        timestamps: false
    }
);

async function tieneEncuestaRespondida(llamadasEnPeriodo) {
    let llamadasConEncuesta = [];
    for (const llamadaItem of llamadasEnPeriodo) {
        await respuestaDeCliente.RespuestaDeCliente.findAll({
            where: {
                llamadaId: llamadaItem.llamadaId
            }
        })
            .then(async (respuestasDeCliente) => {
                if (respuestasDeCliente.length > 0) llamadasConEncuesta.push(llamadaItem)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return llamadasConEncuesta;
};
async function esDePeriodo(params) {
    const llamadasDentroPeriodo = [];
    await Llamada.findAll()
        .then(async (llamadas) => {
            for (const llamadaItem of llamadas) {
                let cambioEstadoActual = await cambioEstado.esUltimoEstado(llamadaItem.llamadaId);
                let fechaHoraEstadoFinalizado = (await cambioEstado.esFinalizada(cambioEstadoActual)) ?? null;
                if (fechaHoraEstadoFinalizado && ((new Date(fechaHoraEstadoFinalizado)) >= new Date(params.fechaDesde) && (new Date(fechaHoraEstadoFinalizado)) <= new Date(params.fechaHasta))) {
                    llamadasDentroPeriodo.push(llamadaItem);
                }
            }

        })
        .catch((error) => {
            console.log(error);
        });
    return llamadasDentroPeriodo;
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

export { esDePeriodo, tieneEncuestaRespondida, obtenerNombreCliente, getEstadoActual, getDuracion, getRespuestas, obtenerDatosGeneralesLlamada }