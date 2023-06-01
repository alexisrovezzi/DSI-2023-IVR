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
import * as estado from './estado.js';

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
        const esIncial = await estado.esInicial(cambioEstadoItem.estadoId);
        if (esIncial) return cambioEstadoItem.fechaHoraInicio;
      }
      return null;
    })
    .catch((error) => {
      console.log(error);
    });
}
async function esFinalizada(cambioEstadoId) {
  let fechaHoraInicioEstadoFinalizado = null;
  // preguntar al estado si es finalizado
  await CambioEstado.findOne({
    where: {
      cambioEstadoId: cambioEstadoId
    }
  })
    .then(async (cambioEstado) => {
      const esFinal = await estado.esFinalizada(cambioEstado.estadoId);
      if (esFinal) {
        fechaHoraInicioEstadoFinalizado = cambioEstado.fechaHoraInicio;
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return fechaHoraInicioEstadoFinalizado;
}
async function esUltimoEstado(llamadaId) {
  let ultimoCambioEstadoId = -1
  // Obtener el último cambio de estado
  await CambioEstado.findOne({
    where: {
      llamadaId: llamadaId
    },
    order: [['fechaHoraInicio', 'DESC']]
  })
    .then((cambioEstado) => {
      ultimoCambioEstadoId = cambioEstado.cambioEstadoId;
    })
    .catch((error) => {
      console.log(error);

    });
  return ultimoCambioEstadoId;
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
async function getNombreEstado(cambioEstadoId) {
  let estadoNombre = "";
  await CambioEstado.findOne({
    where: {
      cambioEstadoId: cambioEstadoId
    }
  })
    .then( async (cambioEstado) => {
      estadoNombre =  await estado.getNombre(cambioEstado?.estadoId)
    })
    .catch((error) => {
      console.log(error);
    });
  return estadoNombre;
}

export { CambioEstado, esFinalizada, esEstadoInicial, esUltimoEstado, getFechaHoraInicio, newCambioEstado, getNombreEstado }