import { Router } from "express";
export const router = Router();

// Por hora las peticiones se hacen publicas. Sin necesidad de token. 
router.get(`/`, (req,res)=>{
    res.json({message: "API-IVR Publica"})
    
})


