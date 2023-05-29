import * as generadorCSV from '../entidades/generadorCSV.js'

const obtenerLlamadasConEncuestaRespondida = async (req, res) => {
    const body = req.body;
    let consult = new Date;
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:5 ~ obtenerLlamadasConEncuestaRespondida ~ body:", body, consult)
    let respuesta = [
        {
            llamadaId: 1,
            descripcionOperador: "Primera llamada cliente 1",
            duracion: "36min",
        },
        {
            llamadaId: 2,
            descripcionOperador: "Segunda llamada cliente 1",
            duracion: "24min",
        },
    ]

    res.status(200).json(respuesta);
}

const obtenerDatosLlamada = async (req, res) => {
    let consult = new Date;
    console.log("🚀 ~ file: gestorConsultarEncuesta.js:25 ~ obtenerDatosLlamada ~ consult:", consult)
    let respuesta = {
        cliente: "Juan Picapiedra",
        estadoActual: "Iniciado",
        duracion: "25min",
        respuestas: [
            {
                descRespuesta: "Sudamérica.",
                descPregunta: "¿En qué continente se encuentra Brasil?",
            },
            {
                descRespuesta: "París.",
                descPregunta: "¿Cuál es la capital de Francia?",
            },
        ],
        descEncuesta: "Cultura general"
    };
    res.status(200).json(respuesta);
}

const generarCSV = async (req, res) => {
    let consult = new Date;
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
            // Envía el archivo CSV como respuesta
            res.download('archivo.csv', 'archivo.csv', (err) => {
                if (err) {
                    console.error('Error al descargar el archivo CSV:', err);
                    res.status(500).send('Error al descargar el archivo CSV');
                }
            });
        })
        .catch((err) => {
            console.error('Error al escribir los registros en el archivo CSV:', err);
            res.status(500).send('Error al generar el archivo CSV');
        });

}

export { obtenerLlamadasConEncuestaRespondida, obtenerDatosLlamada, generarCSV }
