//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { loginController } from "../controller/users/loginController";
import { signupController } from "../controller/users/signUpController";
import { ChngPasswordController } from "../controller/users/chpassController";
import { ModUserController } from "../controller/users/ModUserController";
import { logoutController } from "../controller/users/logoutController";
import { getProjectController } from "../controller/projects/getProjectsController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/login', loginController);
router.post('/signup', signupController);
router.post('/change-password', ChngPasswordController);
router.post('/user-settings', ModUserController);
router.post('/logout', logoutController);

router.get('/main-page', getProjectController)

export default router;
