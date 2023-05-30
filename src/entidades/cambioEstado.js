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
import * as e from './estado.js';

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
    timestamps: false
  }
);

async function esEstadoInicial(llamadaId) {
  // preguntar al estado si es inicial
  CambioEstado.findAll({
    where: {
      llamadaId: llamadaId
    },
    order: [['fechaHoraInicio', 'ASC']]
  })
    .then(async (cambiosEstado) => {
      for (const cambioEstadoItem of cambiosEstado) {
        const esIncial = await e.esInicial(cambioEstadoItem.estadoId);
        if (esIncial) return cambioEstadoItem.fechaHoraInicio;
      }
      return null;
    })
    .catch((error) => {
      console.log(error);
    });
}
async function esUltimoEstado(llamadaId) {
  // Obtener el último cambio de estado
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
async function getFechaHoraInicio(cambioEstadoId) {
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
async function newCambioEstado(payload) {
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
async function getNombreEstado(estadoId) {
  return await e.getNombre(estadoId);
}

export { CambioEstado, esEstadoInicial, esUltimoEstado, getFechaHoraInicio, newCambioEstado, getNombreEstado }