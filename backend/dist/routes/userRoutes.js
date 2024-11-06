"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Acá manejaremos todas las rutas de importancia relacionadas con usuario
const express_1 = require("express");
const loginController_1 = require("../controller/users/loginController");
const signUpController_1 = require("../controller/users/signUpController");
const chpassController_1 = require("../controller/users/chpassController");
const ModUserController_1 = require("../controller/users/ModUserController");
const router = (0, express_1.Router)();
//Hacemos routing para el logging del usuario
router.post('/login', loginController_1.loginController);
router.post('/signup', signUpController_1.signupController);
router.post('/chgpass', chpassController_1.ChngPasswordController);
router.post('/modUser', ModUserController_1.ModUserController);
exports.default = router;
