//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { loginController } from "../controller/loginController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/login', loginController)

export default router;
