/*
atributos:
cambioEstadoId
fechaHoraInicio
estadoId
llamadaId

metodos:
esEstadoInicial()
esUltimoEstado()
getFechaHoraInicio()
new()
getNombreEstado()
*/

import { DataTypes } from "sequelize";
import { sequelize } from '../data/config.js';

const CambioEstado = sequelize.define(
    "CambioEstados",
    {
        cambioEstadoId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        fechaHoraInicio: { 
            type: DataTypes.DATE, 
            allowNull: false
        },
        estadoId: { 
            type: DataTypes.INTEGER,
            allowNull: false, 
        },
        llamadaId: { 
            type: DataTypes.INTEGER, 
            allowNull: false
        }
    },
    {
        sequelize,
    }
);

// CambioEstado.associate = (models) => {
//     CambioEstado.hasOne(models.Estado, { foreignKey: 'estadoId' });
// };

// CambioEstado.associate = (models) => {
//     CambioEstado.hasOne(models.Llamada, { foreignKey: 'llamadaId' });
// };

async function esEstadoInicial(){
    // preguntar al estado si es inicial

}
async function esUltimoEstado(llamadaId){
    // preguntar es el ultimo cambio de estado
    CambioEstado.findOne({
        where: {
            llamadaId: llamadaId
        },
        order: [['fechaHoraInicio', 'DESC']]
      })
      .then((cambioEstado) => {
        console.log(cambioEstado);
        return cambioEstado.cambioEstadoId;
      })
      .catch((error) => {
        console.log(error);
      });
}
async function getFechaHoraInicio(cambioEstadoId){
    CambioEstado.findOne({
        where: {
            cambioEstadoId: cambioEstadoId
        }
      })
      .then((cambioEstado) => {
        return cambioEstado?.fechaHoraInicio;
      })
      .catch((error) => {
        console.log(error);
      });
}
async function newCambioEstado(payload){
    const estadoId = payload.estadoId;
    const llamadaId = payload.llamadaId;
    const fechaHoraInicio = payload.fechaHoraInicio;

    CambioEstado.create({
        fechaHoraInicio: fechaHoraInicio,
        estadoId: estadoId,
        llamadaId: llamadaId,
      })
        .then((cambioEstado) => {
          console.log('Cliente created:', cambioEstado.toJSON());
          return cambioEstado?.cambioEstadoId;
        })
        .catch((error) => {
          console.error('Error creating cliente:', error);
        });
}
async function getNombreEstado(estadoId){
    // llamar a estado para obtener su nombre
}

export {esEstadoInicial, esUltimoEstado, getFechaHoraInicio, newCambioEstado, getNombreEstado}