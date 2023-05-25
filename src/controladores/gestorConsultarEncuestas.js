import * as generadorCSV from '../entidades/generadorCSV.js'

const obtenerLlamadasConEncuestaRespondida = async (req, res) => {
    let respuesta = {

    };
    res.status(200).json(respuesta);
}

const obtenerDatosLlamada = async (req, res) => {
    let respuesta = {

    };
    res.status(200).json(respuesta);
}

const generarCSV = async (req, res) => {
    let payload = [
        { nombre: 'Juan', apellido: 'Pérez', edad: 25 },
        { nombre: 'María', apellido: 'Gómez', edad: 30 },
        { nombre: 'Pedro', apellido: 'López', edad: 35 }
    ];

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
