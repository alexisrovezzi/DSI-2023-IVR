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
import * as ce from './cambioEstado.js';
import * as c from './cliente.js';

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
    // DURASO tiene que llamar a getrespuestas despues 
    // con esas respuestas debe llamar al getfechaencuesta 
    // ¿de las respuestas del cliente y despues estado inicial??

    // lo cambie:
    /* 
    
     */
}
async function obtenerNombreCliente(llamadaId) {
    Llamada.findOne({
        where: {
            llamadaId: llamadaId
        }
    })
        .then(async (llamada) => {
            return await c.getNombre(llamada.clienteId);
        })
        .catch((error) => {
            console.log(error);
        });
}
async function getEstadoActual(llamadaId) {
    const ultimoCambioEstado = await ce.esUltimoEstado(llamadaId);
    return await ce.getNombreEstado(ultimoCambioEstado);
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
async function getRespuestas() {
    // ir a respuestas de cliente y obtener los punteros 
    //de las respuetas posibles obtener la fecha encuesta 
    //y la descrupcion de las respuestas posibles dadas
}

async function obtenerDatosGeneralesLlamada() {
    // obtener nombre de cliente, get estadoactual,
    // get duracion, get respuestas
    // devolver todo eso
 }



export { tieneEncuestaRespondida, obtenerNombreCliente, getEstadoActual, getDuracion, getRespuestas, obtenerDatosGeneralesLlamada }