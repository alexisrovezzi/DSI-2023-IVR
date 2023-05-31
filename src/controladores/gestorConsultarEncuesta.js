import fs, { existsSync } from "fs";
import * as generadorCSV from '../entidades/generadorCSV.js'
import * as llamada from '../entidades/llamada.js';
import * as encuesta from '../entidades/encuesta.js';


const consultarEncuesta = async (req, res) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:9 ~ consultarEncuesta ~ consult:", consult)
    res.status(200).json({ message: "API-IVR Publica" })
}

const tomarPeriodoAFiltrar = async (req, res) => {
    const periodo = req.body;
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:6 ~ tomarPeriodoAFiltrar ~ consult:", consult)
    const respuesta = await buscarLlamadasConEncuestaRespondida(periodo);
    if (respuesta.length > 0) res.status(200).json(respuesta);
    else res.status(404).json({ mensaje: "No hay llamadas en el período con encuestas respondidas." });
};

const tomarSeleccionLlamada = async (req, res) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:24 ~ tomarSeleccionLlamada ~ consult:", consult)
    const llamadaId = req.params.llamadaId;
    const llamada = await buscarDatosLlamada(llamadaId);
    const encuesta = await obtenerDatosEncuesta(llamada.fechaRespuestaCliente)
    res.status(200).json(llamada);
}

const opcionGenerarCSV = async (req, res) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:33 ~ opcionGenerarCSV ~ consult:", consult)
    const payload = req.body;
    if (await generarCSV(payload)) {
        res.download('archivo.csv', 'archivo.csv', (err) => {
            if (err) {
                console.error('Error al descargar el archivo CSV:', err);
                res.status(500).send('Error al descargar el archivo CSV');
            }
        });
    };
    finCU44();
}

const finCU44 = async () => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:48 ~ finCU44 ~ consult:", consult)
    const filePath = '../../archivo.csv';
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error al borrar el archivo:', err);
            return;
        }

        console.log('Archivo borrado exitosamente.');
    });

}

const buscarLlamadasConEncuestaRespondida = async (periodo) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:63 ~ buscarLlamadasConEncuestaRespondida ~ consult:", consult, "periodo", periodo)
    let llamadas = [];
    llamadas = await llamada.esDePeriodo(periodo);
    llamadas = await llamada.tieneEncuestaRespondida(llamadas);
    const response = {}
    // let llamadas = [
    //     {
    //         llamadaId: 1,
    //         descripcionOperador: "Primera llamada cliente 1",
    //         duracion: "36min",
    //     },
    //     {
    //         llamadaId: 2,
    //         descripcionOperador: "Segunda llamada cliente 1",
    //         duracion: "24min",
    //     },
    // ]
    return response;
}

const buscarDatosLlamada = async (llamadaId) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:25 ~ buscarDatosLlamada ~ consult:", consult)
    let datosLlamada = {};
    datosLlamada = await llamada.obtenerDatosGeneralesLlamada(llamadaId);
    let datosEncuesta = {};
    datosEncuesta = obtenerDatosEncuesta(datosLlamada.respuestasDeCliente[0].fechaRespuestaCliente);
    const response = {}
    // let respuesta = {
    //     cliente: "Juan Picapiedra",
    //     estadoActual: "Iniciado",
    //     duracion: "25min",
    //     respuestas: [
    //         {
    //             descRespuesta: "Sudamérica.",
    //             descPregunta: "¿En qué continente se encuentra Brasil?",
    //         },
    //         {
    //             descRespuesta: "París.",
    //             descPregunta: "¿Cuál es la capital de Francia?",
    //         },
    //     ],
    //     descEncuesta: "Cultura general"
    // };
    res.status(200).json(response);
}

const obtenerDatosEncuesta = async (fechaRespuestaCliente) => {
    const encuestaDatos = {};
    encuestaDatos.encuestaDeCliente = await encuesta.esEncuestaDeCliente(fechaRespuestaCliente);
    encuestaDatos.descripcionEncuesta =  await  encuesta.getDescripcionEncuesta(encuestaDeCliente);
    encuestaDatos.preguntasDeEncuesta = await encuesta.obtenerPreguntas(encuestaDeCliente);
    return encuestaDatos;
}

const generarCSV = async (req, res) => {
    let consult = (new Date()).toString();
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:47 ~ generarCSV ~ consult:", consult)
    let payload = {
        encabezado: [
            { nombre: 'Juan Picapiedra', estado: 'Iniciada', duracion: 25 },
        ],
        saltoDeLinea: [{ nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" }],
        respuestas: [
            { nombre: '', estado: '', duracion: '', pregunta: "Descripción pregunta", respuesta: "Descripción respuesta seleccionada" },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: "¿Cuál es la capital de Francia?", respuesta: "París." },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: "¿Cuántos lados tiene un triángulo?", respuesta: "Tres." },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: "¿Cuál es el color primario que se obtiene mezclando azul y amarillo?", respuesta: "Verde." },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: "¿En qué continente se encuentra Brasil?", respuesta: "Sudamérica." },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: "¿Cuál es el órgano encargado de bombear sangre en el cuerpo humano?", respuesta: "El corazón." },
            { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" },
            { pregunta: '¿Cuál es el autor de la famosa novela "Cien años de soledad"?', respuesta: "Gabriel García Márquez." },
        ]
    }

    generadorCSV.generarCSV(payload)
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.error('Error al escribir los registros en el archivo CSV:', err);
            res.status(500).send('Error al generar el archivo CSV');
        });

}

export { consultarEncuesta, tomarPeriodoAFiltrar, tomarSeleccionLlamada, opcionGenerarCSV }
