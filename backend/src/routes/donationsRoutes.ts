//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { donateController } from "../controller/donations/donateController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/donate-project', donateController);

export default router;
