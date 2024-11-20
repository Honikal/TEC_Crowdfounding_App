//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";

import { createProjectController } from "../controller/projects/createProjController";
import { filterProjController } from "../controller/projects/filterProjController";
import { getProjectsCategoryController } from "../controller/projects/getProjectsCategoryController";
import { getProjectsUserController } from "../controller/projects/getProjectsUserController";
import { ModProjectController } from "../controller/projects/modProjController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/new-project', createProjectController);
router.post('/edit-project', ModProjectController);
router.post('/filterProjects', filterProjController);

router.get('/search/categories', getProjectsCategoryController);
router.get('/my-projects', getProjectsUserController)

export default router;
