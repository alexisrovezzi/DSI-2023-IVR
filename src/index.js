import express from "express";
//import router from "./routes/articulos.js";
import * as configDB from "./data/config.js";
const app = express()
const port = 27015

// Permite utilizar la funcionalidad de JSON a la hora de recibir/devolver pweticiones.
app.use(express.json());

// Verifica la existencia de la BD.
if (await configDB.syncDB()) {
    //app.use("/api",router)
    app.listen(port, () => {
        console.log("API OK - successfully loaded");
    })
}


