import { Router } from "express";
export const router = Router();

// Por hora las peticiones se hacen publicas. Sin necesidad de token. 
router.get(`/`, (req,res)=>{
    res.json({message: "API-IVR Publica"})
    
})

// Llamada consultar-encuesta que manda FE
router.post(`/consultar-encuesta`,)


