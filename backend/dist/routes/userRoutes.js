"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Acá manejaremos todas las rutas de importancia relacionadas con usuario
const express_1 = require("express");
const loginController_1 = require("../controller/users/loginController");
const signUpController_1 = require("../controller/users/signUpController");
const chpassController_1 = require("../controller/users/chpassController");
const ModUserController_1 = require("../controller/users/ModUserController");
const logoutController_1 = require("../controller/users/logoutController");
const getProjectsController_1 = require("../controller/admin/getProjectsController");
const router = (0, express_1.Router)();
//Hacemos routing para el logging del usuario
router.post('/login', loginController_1.loginController);
router.post('/signup', signUpController_1.signupController);
router.post('/change-password', chpassController_1.ChngPasswordController);
router.post('/user-settings', ModUserController_1.ModUserController);
router.post('/logout', logoutController_1.logoutController);
router.get('/main-page', getProjectsController_1.getProjectsController);
exports.default = router;
