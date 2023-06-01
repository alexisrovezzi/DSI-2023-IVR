import * as csv from 'csv-writer'

const newCSV = async (payload) => {
    let respuestasYPreguntas = [
        { nombre: '', estado: '', duracion: '', pregunta: "Descripción pregunta", respuesta: "Descripción respuesta seleccionada" },
        { nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" }]
    payload.respuestas.forEach(x => {
        const newArray = [{pregunta: x.descPregunta, respuesta: x.descRespuesta},{ nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" } ]
        respuestasYPreguntas = respuestasYPreguntas.concat(newArray);
    });
    let payloadDatos = {
        encabezado: [
            { nombre: payload.cliente, estado: payload.estadoActual, duracion: payload.duracion },
        ],
        saltoDeLinea: [{ nombre: '', estado: '', duracion: '', pregunta: "", respuesta: "" }],
        respuestas: respuestasYPreguntas
    }

    // Definir las columnas del archivo CSV
    const csvWriter = csv.createObjectCsvWriter({
        path: 'archivo.csv',
        header: [
            { id: 'nombre', title: 'Nombre del cliente' },
            { id: 'estado', title: 'Estado actual de la llamada' },
            { id: 'duracion', title: 'Duracion de la llamada en minutos' },
            { id: 'pregunta', title: ' ' },
            { id: 'respuesta', title: ' ' },
        ],

    });
    // Escribe los datos en el archivo CSV
    await csvWriter.writeRecords(payloadDatos.encabezado);
    await csvWriter.writeRecords(payloadDatos.saltoDeLinea);
     return csvWriter.writeRecords(payloadDatos.respuestas)
        
}

export { newCSV };