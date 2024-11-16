//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { donateController } from "../controller/donations/donateController";
import { getDonationsUserController } from "../controller/donations/getDonationsUserController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/donate-project', donateController);

router.get('/my-donations', getDonationsUserController);

export default router;
