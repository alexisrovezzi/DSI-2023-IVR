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
    let duracion = "";
    await Llamada.findOne({
        where: {
            llamadaId: llamadaId
        }
    })
        .then((llamada) => {
            duracion = (llamada?.duracion ?? '0') + ' Min';
        })
        .catch((error) => {
            console.log(error);
        });
    return duracion;
}
async function getRespuestas(llamadaId) {
    return await respuestaDeCliente.obtenerDatosDeRespuestas(llamadaId)
}

async function obtenerDatosGeneralesLlamada(llamadaId) {
    let datosGeneralesLlamada = {};
    await Llamada.findOne({
        where: {
            llamadaId: llamadaId
        }
    })
        .then(async ({clienteId, llamadaId}) => {
            datosGeneralesLlamada.cliente = await cliente.getNombre(clienteId);
            datosGeneralesLlamada.estadoActual = await getEstadoActual(llamadaId);
            datosGeneralesLlamada.duracion = await getDuracion(llamadaId);
            datosGeneralesLlamada.respuestas = await getRespuestas(llamadaId);
        })
        .catch((error) => {
            console.log(error);
        });

    return datosGeneralesLlamada;
}

export { esDePeriodo, tieneEncuestaRespondida, obtenerNombreCliente, getEstadoActual, getDuracion, getRespuestas, obtenerDatosGeneralesLlamada }