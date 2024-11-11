//Acá manejaremos todas las rutas de importancia relacionadas con usuario
import { Router } from "express";

import { createProjectController } from "../controller/projects/createProjController";
import { modProjectController } from "../controller/projects/modProjController";
import { filterProjController } from "../controller/projects/filterProjController";
import { getProjectsCategoryController } from "../controller/projects/getProjectsCategoryController";

const router = Router();

//Hacemos routing para el logging del usuario
router.post('/new-project', createProjectController);
router.post('/editProject', modProjectController);
router.post('/filterProjects', filterProjController);

router.get('/search/categories', getProjectsCategoryController);

export default router;
