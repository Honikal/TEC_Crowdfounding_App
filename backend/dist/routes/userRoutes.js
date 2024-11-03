"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Acá manejaremos todas las rutas de importancia relacionadas con usuario
const express_1 = require("express");
const loginController_1 = require("../controller/loginController");
const router = (0, express_1.Router)();
//Hacemos routing para el logging del usuario
router.post('/login', loginController_1.loginController);
exports.default = router;
