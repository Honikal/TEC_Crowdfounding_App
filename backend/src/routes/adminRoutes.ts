//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";
import { deactivateProjController } from "../controller/admin/deactivateProjController";
import { deactivateAccController } from "../controller/admin/deactivateAccController";
import { asignModController } from "../controller/admin/asignModController";
import { getUsersController } from "../controller/admin/getUsersController";
import { getProjectsController } from "../controller/admin/getProjectsController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/deactivateProject', deactivateProjController);
router.post('/deactivateAccount', deactivateAccController);
router.post('/asignMod', asignModController);

router.get('/deactivateProject', getProjectsController)
router.get('/deactivateAccount', getUsersController);
router.get('/asignMod', getUsersController);

export default router;
