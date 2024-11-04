//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { loginController } from "../controller/loginController";
import { signupController } from "../controller/signUpController";
import { ChngPasswordController } from "../controller/chpassController";
import { ModUserController } from "../controller/ModUserController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/chgpass', ChngPasswordController);
router.post('/modUser', ModUserController);

export default router;
