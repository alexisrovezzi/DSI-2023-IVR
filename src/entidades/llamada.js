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

async function tieneEncuestaRespondida(){}
async function obtenerNombreCliente(){}
async function getEstadoActual(){}
async function getDuracion(){}
async function getRespuestas(){}



export {tieneEncuestaRespondida, obtenerNombreCliente, getEstadoActual, getDuracion, getRespuestas}