import { Router } from "express";
export const router = Router();
import * as gestor from "../controladores/gestorConsultarEncuesta.js"; 

// Por hora las peticiones se hacen publicas. Sin necesidad de token. 
router.get(`/`, gestor.consultarEncuesta)

// Interceptores de las consultas que manda la pantalla.
router.post(`/llamadas-cn-encuesta-resp`,gestor.tomarPeriodoAFiltrar)

router.get(`/llamada/:id`,gestor.tomarSeleccionLlamada)

router.post(`/llamada-csv`,gestor.opcionGenerarCSV)



