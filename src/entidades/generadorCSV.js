/*

atributos:
encabezado
preguntas

metodos:
generarCSV()


*/

import * as csv from 'csv-writer'

const generarCSV = async (payload) => {

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
        //header: payload.sections.flatMap(section => section.header.map(column => ({ id: column, title: column }))),

    });
    // Escribe los datos en el archivo CSV
    await csvWriter.writeRecords(payload.encabezado);
    await csvWriter.writeRecords(payload.saltoDeLinea);

     return csvWriter.writeRecords(payload.respuestas)
        

}

export { generarCSV };