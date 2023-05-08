import express from "express";
import * as configDB from "./data/config.js";
import * as router from "./routes/publicRoutes.js"
const app = express()
const port = 27015

// Permite utilizar la funcionalidad de JSON a la hora de recibir/devolver pweticiones.
app.use(express.json());

// Verifica la existencia de la BD.
(async () => {
    try {
        await (configDB.syncDB())
        app.use("/api", router.router)
        app.listen(port, () => {
            console.log("API OK - successfully loaded");
        })
    } catch (error) { console.log("API ERROR - Could not sync with DB", error) }

})()



