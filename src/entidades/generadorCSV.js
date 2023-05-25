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
            { id: 'nombre', title: 'Nombre' },
            { id: 'apellido', title: 'Apellido' },
            { id: 'edad', title: 'Edad' }
        ]
    });

    // Escribe los datos en el archivo CSV
    return csvWriter.writeRecords(payload)

} 

export {generarCSV};