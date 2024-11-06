"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Acá manejaremos todas las rutas de importancia relacionadas con usuario
const express_1 = require("express");
const createProjController_1 = require("../controller/projects/createProjController");
const modProjController_1 = require("../controller/projects/modProjController");
const filterProjController_1 = require("../controller/projects/filterProjController");
const router = (0, express_1.Router)();
//Hacemos routing para el logging del usuario
router.post('/createProject', createProjController_1.createProjectController);
router.post('/editProject', modProjController_1.modProjectController);
router.post('/filterProjects', filterProjController_1.filterProjController);
exports.default = router;
