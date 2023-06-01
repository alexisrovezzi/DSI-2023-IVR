import fs, { existsSync } from "fs";
import * as generadorCSV from '../interfaces/generadorCSV.js'
import * as llamada from '../entidades/llamada.js';
import * as encuesta from '../entidades/encuesta.js';
import { response } from "express";



const consultarEncuesta = async (req, res) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:9 ~ consultarEncuesta ~ consult:", (new Date()).toString())
    res.status(200).json({ message: "API-IVR Publica" })
}

const tomarPeriodoAFiltrar = async (req, res) => {
    const periodo = req.body;
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:6 ~ tomarPeriodoAFiltrar ~ consult:", (new Date()).toString())
    const llamadasCnEncuestaRespondida = await buscarLlamadasConEncuestaRespondida(periodo);
    if ((llamadasCnEncuestaRespondida?.length ?? 0) > 0) res.status(200).json(llamadasCnEncuestaRespondida);
    else res.status(404).json({ mensaje: "No hay llamadas en el período con encuestas respondidas." });
};

const tomarSeleccionLlamada = async (req, res) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:24 ~ tomarSeleccionLlamada ~ consult:", (new Date()).toString())
    const llamadaId = req.params.id ?? -1;
    try {
        const datosLlamada = await buscarDatosLlamada(llamadaId);
        let punterosRespuestasPosibles = datosLlamada.respuestas.map(x => x.respuestaPosibleId);
        const datosEncuesta = await obtenerDatosEncuesta(datosLlamada.respuestas[0].fechaEncuesta, punterosRespuestasPosibles);
        if (llamada && encuesta) {
            const respuestas = [];
            datosEncuesta.preguntasDeEncuesta.forEach(pregunta => {
                let respuestaCnPregunta = {
                    descPregunta: pregunta.descripcion,
                    descRespuesta: (datosLlamada.respuestas.find(x => { return x.respuestaPosibleId === pregunta.respuestaPosibleId })).descRespuesta
                }
                respuestas.push(respuestaCnPregunta);
            });
            const response = {
                cliente: datosLlamada.cliente,
                estadoActual: datosLlamada.estadoActual,
                duracion: datosLlamada.duracion,
                respuestas: respuestas,
                descEncuesta: datosEncuesta.descripcionEncuesta
            };
            res.status(200).json(response)
        }
        else res.status(404).json({ message: "Llamada no encontrada." });

    } catch (error) {
        res.status(500).json({ message: "Fallo en la busqueda de llamada." });
    }
}

const opcionGenerarCSV = async (req, res) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:33 ~ opcionGenerarCSV ~ consult:", (new Date()).toString())
    let id = req?.params?.id;
    if (!id) {
        res.status(500).json({ message: "Fallo en el envio de llamada para generar csv." });
    }
    const payload = await importDatos(id);
    await generarCSV(payload);
    function devolverArchivo() {
        return new Promise((resolve, reject) => {
          res.download('archivo.csv', 'archivo.csv', (err) => {
            if (err) {
              console.error('Error al descargar el archivo CSV:', err);
              reject('Error al descargar el archivo CSV');
            } else {
              resolve();
            }
          });
        });
      }
      await devolverArchivo();
      finCU44();
}

const finCU44 = async () => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:48 ~ finCU44 ~ consult:", (new Date()).toString())
    const filePath = 'archivo.csv';
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al borrar el archivo:', err);
            return;
        }

        console.log('Archivo borrado exitosamente.');
    });

}

const buscarLlamadasConEncuestaRespondida = async (periodo) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:63 ~ buscarLlamadasConEncuestaRespondida ~ consult:", (new Date()).toString(), "periodo", periodo)
    let llamadasEnPeriodo = [];
    llamadasEnPeriodo = await llamada.esDePeriodo(periodo);
    let llamadasConEncuesta = [];
    llamadasConEncuesta = await llamada.tieneEncuestaRespondida(llamadasEnPeriodo);
    let response = [];
    response = llamadasConEncuesta ?? [];
    return response;
}

const buscarDatosLlamada = async (llamadaId) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:25 ~ buscarDatosLlamada ~ consult:", (new Date()).toString())
    let datosLlamada = {};
    datosLlamada = await llamada.obtenerDatosGeneralesLlamada(llamadaId);
    return datosLlamada;
}

const obtenerDatosEncuesta = async (fechaRespuestaCliente, punterosRespuestasPosibles) => {
    const encuestaDatos = {};
    encuestaDatos.encuestaDeCliente = await encuesta.esEncuestaDeCliente(fechaRespuestaCliente);
    encuestaDatos.descripcionEncuesta = await encuesta.getDescripcionEncuesta(encuestaDatos.encuestaDeCliente.encuestaId);
    encuestaDatos.preguntasDeEncuesta = await encuesta.obtenerPreguntas(encuestaDatos.encuestaDeCliente.encuestaId, punterosRespuestasPosibles);
    return encuestaDatos;
}

const generarCSV = async (payload) => {
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:47 ~ generarCSV ~ consult:", (new Date()).toString())
    return await generadorCSV.newCSV(payload)
}
const importDatos = async (id)=>{
    const llamadaId = id ?? -1;
    try {
        const datosLlamada = await buscarDatosLlamada(llamadaId);
        let punterosRespuestasPosibles = datosLlamada.respuestas.map(x => x.respuestaPosibleId);
        const datosEncuesta = await obtenerDatosEncuesta(datosLlamada.respuestas[0].fechaEncuesta, punterosRespuestasPosibles);
        if (llamada && encuesta) {
            const respuestas = [];
            datosEncuesta.preguntasDeEncuesta.forEach(pregunta => {
                let respuestaCnPregunta = {
                    descPregunta: pregunta.descripcion,
                    descRespuesta: (datosLlamada.respuestas.find(x => { return x.respuestaPosibleId === pregunta.respuestaPosibleId })).descRespuesta
                }
                respuestas.push(respuestaCnPregunta);
            });
            const response = {
                cliente: datosLlamada.cliente,
                estadoActual: datosLlamada.estadoActual,
                duracion: datosLlamada.duracion,
                respuestas: respuestas,
                descEncuesta: datosEncuesta.descripcionEncuesta
            };
            return response
        }
        else return {message: "fallo"}

    } catch (error) {
        return {message: "Fallo en la busqueda de llamada." }
    }
}

export { consultarEncuesta, tomarPeriodoAFiltrar, tomarSeleccionLlamada, opcionGenerarCSV }








