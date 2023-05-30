import { Router } from "express";
export const router = Router();
import * as gestor from "../controladores/gestorConsultarEncuesta.js"; 

// Por hora las peticiones se hacen publicas. Sin necesidad de token. 
router.get(`/`, (req,res)=>{
    res.json({message: "API-IVR Publica"})
    
})

// Interceptores de las consultas que manda la pantalla.
router.get(`/llamadas-cn-encuesta-resp`,gestor.tomarPeriodoAFiltrar)

router.get(`/llamada/:id`,gestor.tomarSeleccionLlamada)

router.get(`/llamada-csv/:id`,gestor.opcionGenerarCSV)



