//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";

import { createProjectController } from "../controller/projects/createProjController";
import { modProjectController } from "../controller/projects/modProjController";
import { filterProjController } from "../controller/projects/filterProjController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/createProject', createProjectController);
router.post('/editProject', modProjectController);
router.post('/filterProjects', filterProjController);

export default router;
